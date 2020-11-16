import Path from 'path';
import fs from 'fs-extra';
import tar from 'tar';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import tmp from 'tmp';
import mime from 'mime-types';
import { XMLHttpRequest } from 'xmlhttprequest';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { APIClient, Course, CourseLessonUpload } from 'shared';
import {
  execWebpack,
  getAllFiles,
  getWebpackModule,
  md5,
  uploadS3,
} from './helper';
import { CourseTask, TaskInfo, TaskUpload } from './types';

function _getCourseBaseDir(courseName: string) {
  return Path.join(__dirname, '../', courseName);
}

async function _collectSources(tasks: TaskInfo[]) {
  await Promise.all(
    tasks.map(async task => {
      const sourceDir = Path.join(task.taskDir, 'source');
      const dir = tmp.dirSync();
      const allFiles = await getAllFiles(sourceDir, x =>
        ['node_modules'].includes(x)
      );
      await Promise.all(
        allFiles.map(async file => {
          const targetPath = Path.join(dir.name, file.relativePath);
          await fs.ensureDir(Path.dirname(targetPath));
          if (file.fullPath.endsWith('.ts')) {
            let content = await fs.readFile(file.fullPath, 'utf8');
            content = content.replace(
              /(\/\/ TRIM_START)(.*?)(\/\/ TRIM_END)/s,
              ``
            );
            await fs.writeFile(targetPath, content);
          } else {
            await fs.copy(file.fullPath, targetPath);
          }
        })
      );
      await tar.create(
        {
          gzip: true,
          portable: true,
          file: task.sourceTarPath,
          cwd: dir.name,
          filter: (path, stat) => {
            stat.mtime = null!;
            return true;
          },
        },
        await fs.readdir(dir.name)
      );
      await fs.emptyDir(dir.name);
      dir.removeCallback();
    })
  );
}

async function _buildDetails(courseName: string, tasks: TaskInfo[]) {
  const entry: Record<string, string[]> = {};
  tasks.forEach(task => {
    entry[task.uniqName] = [task.detailsPath];
  });
  const basedir = _getCourseBaseDir(courseName);
  const detailsDir = Path.join(basedir, 'dist');
  await execWebpack({
    context: basedir,
    name: 'client',
    target: 'web',
    mode: 'production',
    devtool: false,
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', 'json5'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ] as any,
    },
    entry: entry,
    externals: {
      react: 'root React',
      'react-dom': 'root ReactDom',
      'styled-components': 'root StyledComponents',
    },
    output: {
      library: 'TaskJSONP',
      filename: '[name].js',
      chunkFilename: '[name].js',
      libraryTarget: 'jsonp',
      path: detailsDir,
      publicPath: '/',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
    module: getWebpackModule(),
  });
}

function _getTasks(courseName: string) {
  const tasks: TaskInfo[] = [];
  const courseDir = _getCourseBaseDir(courseName);
  const basedir = Path.join(courseDir, 'tasks');
  fs.readdirSync(basedir).forEach(dirName => {
    const weekExec = /^week(\d+)$/.exec(dirName);
    if (!weekExec) {
      return;
    }
    const week = Number(weekExec[1]);
    const weekDir = Path.join(basedir, dirName);
    fs.readdirSync(weekDir).forEach(taskName => {
      const taskExec = /^(\d+)-/.exec(taskName);
      if (!taskExec) {
        return;
      }
      const id = Number(taskExec[1]);
      const taskDir = Path.join(weekDir, taskName);
      const task: CourseTask = require(Path.join(taskDir, 'info.ts')).info;
      if (!task) {
        throw new Error(`Info not found for ${taskName}`);
      }
      const detailsPath = Path.join(taskDir, 'details', 'index.tsx');
      if (!fs.existsSync(detailsPath)) {
        throw new Error(`${detailsPath} doesn't exist`);
      }
      const uniqName = `${week}_${id}`;
      const distFileName = `${uniqName}.js`;
      tasks.push({
        id,
        week,
        task,
        taskDir,
        detailsPath,
        distFileName,
        uniqName,
        distFilePath: Path.join(courseDir, 'dist', distFileName),
        sourceTarPath: Path.join(courseDir, 'dist', `${uniqName}.tar.gz`),
      });
    });
  });
  if (!tasks.length) {
    throw new Error(`No tasks in ${courseName}`);
  }
  return tasks;
}

function _getLesson(courseName: string) {
  const info: Course = require(`../${courseName}/info`).info;
  if (!info) {
    throw new Error('Cannot get course info');
  }
  return info;
}

function _getLessons(courseName: string) {
  const lessons: CourseLessonUpload[] = require(`../${courseName}/lessons`)
    .lessons;
  if (!lessons) {
    throw new Error('Cannot get lessons');
  }
  return lessons;
}

async function _uploadTasks(bucketName: string, tasks: TaskInfo[]) {
  return await Promise.all(
    tasks.map(async task => {
      const taskUpload: TaskUpload = {
        id: task.id,
        week: task.week,
        name: task.task.name,
        detailsS3Key: '',
        sourceS3Key: '',
      };
      await Promise.all(
        [
          { path: task.distFilePath, out: 'detailsS3Key' as const },
          { path: task.sourceTarPath, out: 'sourceS3Key' as const },
        ].map(async file => {
          const { out, path } = file;
          const contentType = mime.lookup(path);
          const ext = Path.extname(path);
          if (!ext) {
            throw new Error('No extension');
          }
          if (!contentType) {
            throw new Error('Cannot get content type: ' + path);
          }
          const name = Path.basename(path, ext);
          const content = await fs.readFile(path);
          const hash = md5(content);
          const s3Key = `protected/${name}.${hash}${ext}`;
          await uploadS3({
            bucketName: bucketName,
            content,
            contentType,
            s3Key,
          });
          taskUpload[out] = s3Key;
        })
      );
      return taskUpload;
    })
  );
}

interface DeployCourseOptions {
  courseName: string;
  s3BucketName: string;
  apiUrl: string;
  accessToken: string;
}

async function deployCourse(options: DeployCourseOptions) {
  const { courseName, s3BucketName, apiUrl, accessToken } = options;
  const info = _getLesson(courseName);
  const lessons = _getLessons(courseName);

  const tasks = _getTasks(courseName);
  await _buildDetails(courseName, tasks);
  await _collectSources(tasks);

  const taskUploads = await _uploadTasks(s3BucketName, tasks);

  const api = new APIClient(
    apiUrl,
    () => accessToken,
    () => new XMLHttpRequest()
  );
  await api.course_updateCourse(info, lessons, taskUploads).toPromise();
}

if (!process.env.COURSE_NAME) {
  throw new Error('COURSE_NAME is not set');
}
if (!process.env.S3_BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME is not set');
}
if (!process.env.API_URL) {
  throw new Error('API_URL is not set');
}
if (!process.env.API_TOKEN) {
  throw new Error('ACCESS_TOKEN is not set');
}

deployCourse({
  courseName: process.env.COURSE_NAME,
  s3BucketName: process.env.S3_BUCKET_NAME,
  apiUrl: process.env.API_URL,
  accessToken: process.env.API_TOKEN,
})
  .then(() => {
    process.exit();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
