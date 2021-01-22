import program from 'commander';
import Path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import mime from 'mime-types';
import AWS from 'aws-sdk';
import { getConfig } from 'config';
import { checkS3KeyExists } from '../helper';

function md5File(path: string) {
  return new Promise((resolve, reject) => {
    const output = crypto.createHash('md5');
    const input = fs.createReadStream(path);

    input.on('error', err => {
      reject(err);
    });

    output.once('readable', () => {
      resolve(output.read().toString('hex'));
    });

    input.pipe(output);
  });
}

export async function uploadAsset(path: string) {
  const config = getConfig('prod');
  if (!config.aws.uploadAssetsCredentials) {
    throw new Error('uploadAssetsCredentials not defined');
  }
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: config.aws.uploadAssetsCredentials.accessKey,
      secretAccessKey: config.aws.uploadAssetsCredentials.secretKey,
    },
  });
  const ext = Path.extname(path);
  if (!ext) {
    throw new Error('No extension');
  }
  const contentType = mime.lookup(path);
  if (!contentType) {
    throw new Error('Cannot get content type');
  }
  const name = Path.basename(path, ext);
  const hash = await md5File(path);
  const s3Key = `assets/${name}.${hash}${ext}`;
  const exists = await checkS3KeyExists(s3, config.aws.s3CDNBucket, s3Key);
  if (!exists) {
    await s3
      .upload({
        Bucket: config.aws.s3CDNBucket,
        Key: s3Key,
        Body: fs.createReadStream(path),
        ContentType: contentType,
        ContentLength: fs.statSync(path).size,
      })
      .promise();
  }
  return {
    url: 'https://cdn.fullstack.pl/' + s3Key,
    s3Key,
  };
}

export function init() {
  program.command('asset <path>').action(async path => {
    const ret = await uploadAsset(path);
    console.log(ret.url);
  });
}
