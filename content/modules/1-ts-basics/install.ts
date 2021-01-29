import Path from 'path';
import { execSync } from 'child_process';

for (let i = 1; i <= 30; i++) {
  console.log(`install ${i}...`);
  execSync('yarn', {
    cwd: Path.join(__dirname, 'task-' + i, 'source'),
    env: process.env,
  });
}
