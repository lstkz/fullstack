import cp from 'child_process';
import Path from 'path';
import { AppConfig } from 'config/types';

export function runScript(
  config: AppConfig,
  cmd: string,
  nodeEnv: 'development' | 'production'
) {
  const p = cp.spawn(cmd, {
    shell: true,
    cwd: Path.join(__dirname, '..'),
    stdio: 'inherit' as const,
    env: {
      ...process.env,
      BUGSNAG_API_KEY: config.bugsnag.frontKey.toString(),
      NODE_ENV: nodeEnv,
      GITHUB_CLIENT_ID: config.github.clientId,
      GOOGLE_CLIENT_ID: config.google.clientId,
      API_URL: config.apiBaseUrl,
      PROTECTED_BASE_URL: config.apiBaseUrl,
    },
  });

  p.addListener('error', error => {
    console.error(error);
    process.exit(1);
  });

  p.addListener('exit', code => {
    process.exit(code);
  });
}
