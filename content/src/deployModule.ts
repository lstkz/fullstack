import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Path from 'path';
import fs from 'fs-extra';
import tar from 'tar';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import tmp from 'tmp';
import mime from 'mime-types';
import fetch from 'node-fetch';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { APIClient, ModuleUpload } from 'shared';
import { config } from 'config';
import {
  execWebpack,
  getAllFiles,
  getWebpackModule,
  md5,
  uploadS3,
} from './helper';
import { TaskInfo } from './types';

function _getModuleBaseDir(moduleName: string) {
  return Path.join(__dirname, '../modules', moduleName);
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

async function _buildDetails(moduleName: string, tasks: TaskInfo[]) {
  const entry: Record<string, string[]> = {};
  tasks.forEach(task => {
    entry[task.uniqName] = [task.detailsPath];
  });
  const basedir = _getModuleBaseDir(moduleName);
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
      prismjs: 'root Prism',
      'react-dom': 'root ReactDom',
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

function _nodeToMarkup(component: string) {
  const node = React.createElement(component);
  return ReactDOMServer.renderToStaticMarkup(node);
}

function _getTasksInfo(module: ModuleUpload) {
  const tasks: TaskInfo[] = [];

  const moduleDir = Path.join(__dirname, '../modules', module.id);
  module.tasks.map(task => {
    const taskDir = Path.join(moduleDir, 'task-' + task.id);
    const detailsPath = Path.join(taskDir, 'details', 'index.tsx');
    const hintPath = Path.join(taskDir, 'details', 'hint.tsx');
    if (!fs.existsSync(detailsPath)) {
      throw new Error(`${detailsPath} doesn't exist`);
    }
    const uniqName = `${task.id}`;
    const distFileName = `${uniqName}.js`;
    const detailsHTML = _nodeToMarkup(require(detailsPath).Details);
    const hintDetailsHTML = fs.existsSync(hintPath)
      ? _nodeToMarkup(require(hintPath).Hint)
      : null;
    const htmlFilePath = tmp.fileSync({
      postfix: '.html',
    }).name;
    fs.writeFileSync(htmlFilePath, detailsHTML);
    const hintHtmlFilePath = hintDetailsHTML
      ? tmp.fileSync({
          postfix: '.html',
        }).name
      : null;
    if (hintHtmlFilePath) {
      fs.writeFileSync(hintHtmlFilePath, hintDetailsHTML!);
    }
    tasks.push({
      task,
      taskDir,
      detailsPath,
      distFileName,
      uniqName,
      htmlFilePath,
      hintHtmlFilePath,
      distFilePath: Path.join(moduleDir, 'dist', distFileName),
      sourceTarPath: Path.join(moduleDir, 'dist', `${uniqName}.tar.gz`),
    });
  });
  if (!tasks.length) {
    throw new Error(`No tasks in ${module.id}`);
  }
  return tasks;
}

function _getInfo(moduleName: string) {
  const info: ModuleUpload = require(`../modules/${moduleName}/info`).info;
  if (!info) {
    throw new Error('Cannot get module info');
  }
  return info;
}

async function _uploadTasks(tasks: TaskInfo[]) {
  await Promise.all(
    tasks.map(async info => {
      await Promise.all(
        [
          { path: info.htmlFilePath, out: 'htmlS3Key' as const },
          { path: info.distFilePath, out: 'detailsS3Key' as const },
          { path: info.sourceTarPath, out: 'sourceS3Key' as const },
          { path: info.hintHtmlFilePath, out: 'hintHtmlS3Key' as const },
        ].map(async file => {
          const { out, path } = file;
          if (!path) {
            return;
          }
          const contentType = mime.lookup(path);
          const ext = path.endsWith('.tar.gz') ? '.tar.gz' : Path.extname(path);
          if (!ext) {
            throw new Error('No extension');
          }
          if (!contentType) {
            throw new Error('Cannot get content type: ' + path);
          }
          const content = await fs.readFile(path);
          const hash = md5(content);
          const prefix = file.out.replace('S3Key', '');
          const s3Key = `${prefix}/${info.task.id}.${hash}${ext}`;
          await uploadS3({
            bucketName: config.aws.s3CDNBucket,
            content,
            contentType,
            s3Key,
          });
          info.task[out] = s3Key;
        })
      );
    })
  );
}

interface DeployModuleOptions {
  moduleName: string;
  apiUrl: string;
  accessToken: string;
}

async function deployModule(options: DeployModuleOptions) {
  const { moduleName, apiUrl, accessToken } = options;
  const info = _getInfo(moduleName);
  const tasks = _getTasksInfo(info);
  await _buildDetails(moduleName, tasks);
  await _collectSources(tasks);
  await _uploadTasks(tasks);

  const api = new APIClient(apiUrl, () => accessToken, fetch);
  await api.module_updateModule(info);
}

if (!process.env.MODULE_NAME) {
  throw new Error('MODULE_NAME is not set');
}

deployModule({
  moduleName: process.env.MODULE_NAME,
  apiUrl: config.apiBaseUrl,
  accessToken: config.adminToken,
})
  .then(() => {
    process.exit();
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
