import Path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export function getTaskInfo() {
  try {
    const pkgPath = Path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(pkgPath)) {
      throw new Error('package.json not found');
    }
    let pkg = null;
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    } catch (e) {
      throw new Error('Cannot parse package.json');
    }
    const moduleId: string = pkg?.fs?.moduleId;
    const taskId: number = pkg?.fs?.taskId;
    if (!moduleId) {
      throw new Error('fs.moduleId not set in package.json');
    }
    if (!taskId) {
      throw new Error('fs.taskId not set in package.json');
    }
    if (!(taskId > 0)) {
      throw new Error('fs.taskId invalid in package.json');
    }
    return { moduleId, taskId };
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}
