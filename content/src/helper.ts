import webpack from 'webpack';
import Path from 'path';
import fs from 'fs-extra';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import { FileUpload } from './types';

let s3: AWS.S3 | null = null;

function getS3() {
  if (!s3) {
    s3 = new AWS.S3();
    // process.env.AWS_DEFAULT_CREDENTIALS === 'true'
    //   ? {}
    //   : {
    //       credentials: {
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    //       },
    //     }
  }
  return s3;
}

export function execWebpack(options: webpack.Configuration) {
  return new Promise<void>((resolve, reject) => {
    webpack(options).run((err, result) => {
      console.log(result?.toString());
      if (result?.hasErrors()) {
        reject(new Error('webpack compilation failed'));
      }
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function getWebpackModule() {
  return {
    rules: [
      {
        test: /\.(html|css)$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  };
}

export function md5(data: string | Buffer) {
  return crypto.createHash('md5').update(data).digest('hex');
}

interface UploadS3Options {
  content: string | Buffer;
  contentType: string;
  bucketName: string;
  s3Key: string;
}

export async function uploadS3(options: UploadS3Options) {
  const { content, contentType, bucketName, s3Key } = options;
  const exists = await getS3()
    .headObject({
      Bucket: bucketName,
      Key: s3Key,
    })
    .promise()
    .then(
      () => true,
      err => {
        if (err.code === 'NotFound') {
          return false;
        }
        throw err;
      }
    );

  if (!exists) {
    await getS3()
      .upload({
        Bucket: bucketName,
        Key: s3Key,
        Body: content,
        ContentType: contentType,
        ContentLength: content.length,
      })
      .promise();
  }

  return s3Key;
}

export async function uploadJSFile(
  bucketName: string,
  upload: FileUpload,
  prefix: string
) {
  const s3Key = `${prefix}/${upload.name}`;
  return uploadS3({
    content: upload.content,
    contentType: 'text/javascript',
    bucketName,
    s3Key,
  });
}

interface FileInfo {
  fullPath: string;
  relativePath: string;
}

export async function getAllFiles(
  baseDir: string,
  ignore: (name: string) => boolean
) {
  const ret: FileInfo[] = [];

  const travel = async (dirName: string) => {
    const list = await fs.readdir(dirName);
    await Promise.all(
      list
        .filter(x => !ignore(x))
        .map(async name => {
          const fullPath = Path.join(dirName, name);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            await travel(fullPath);
          } else {
            ret.push({
              fullPath,
              relativePath: Path.relative(baseDir, fullPath),
            });
          }
        })
    );
  };
  await travel(baseDir);

  return ret;
}
