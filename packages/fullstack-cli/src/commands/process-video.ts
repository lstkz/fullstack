import program from 'commander';
import fs from 'fs';
import Path from 'path';
import { spawn } from 'child_process';
import { cpToPromise } from '../helper';
import { uploadAsset } from './asset';

export function init() {
  program.command('process-video <path>').action(async (path: string) => {
    const suffix = '-4k-base.mp4';
    if (!path.endsWith(suffix)) {
      throw new Error(`Must end with ${suffix}`);
    }
    const baseDir = Path.dirname(path);
    const fileInput = Path.basename(path);
    const file4k = fileInput.replace(suffix, '-4k.mp4');
    const file1080 = fileInput.replace(suffix, '-1080p.mp4');
    const file720 = fileInput.replace(suffix, '-720p.mp4');
    const options = {
      env: process.env,
      shell: true,
      cwd: baseDir,
      stdio: 'inherit' as const,
    };
    if (!fs.existsSync(Path.join(baseDir, file4k))) {
      console.log('optimizing 4k...');
      await cpToPromise(
        spawn(
          'ffmpeg',
          ['-i', fileInput, '-vcodec', 'libx264', '-crf', '16', file4k],
          options
        )
      );
    }
    if (!fs.existsSync(Path.join(baseDir, file1080))) {
      console.log('converting to 1080p...');
      await cpToPromise(
        spawn(
          'ffmpeg',
          ['-i', file4k, '-vf', 'scale=1920:1080', file1080],
          options
        )
      );
    }
    if (!fs.existsSync(Path.join(baseDir, file720))) {
      console.log('converting to 720p...');
      await cpToPromise(
        spawn(
          'ffmpeg',
          ['-i', file1080, '-vf', 'scale=1280:720', file720],
          options
        )
      );
    }
    const files = [
      {
        resolution: '4k',
        file: file4k,
      },
      {
        resolution: '1080p',
        file: file1080,
      },
      {
        resolution: '720p',
        file: file720,
      },
    ];
    const ret = [];
    for (const upload of files) {
      console.log(`uploading ${upload.resolution}...`);
      const uploadData = await uploadAsset(Path.join(baseDir, upload.file));
      ret.push({
        resolution: upload.resolution,
        url: uploadData.url,
      });
    }
    console.log(JSON.stringify(ret, null, 2));
  });
}
