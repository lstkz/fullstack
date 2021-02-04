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
      NODE_ENV: nodeEnv,
      FS_PUBLIC_MIXPANEL_API_KEY: config.mixpanel.apiKey.toString(),
      FS_PUBLIC_BUGSNAG_API_KEY: config.bugsnag.frontKey.toString(),
      FS_PUBLIC_GITHUB_CLIENT_ID: config.github.clientId,
      FS_PUBLIC_GOOGLE_CLIENT_ID: config.google.clientId,
      FS_PUBLIC_API_URL: config.apiBaseUrl,
      FS_PUBLIC_PROTECTED_BASE_URL: config.apiBaseUrl,
      FS_PUBLIC_IDLE_TIMEOUT: String(config.vm.idleTimeout),
      FS_PUBLIC_LOCAL_VM_BASE_PATH: Path.join(
        __dirname,
        '../../../content/modules'
      ),
    },
  });

  p.addListener('error', error => {
    console.error(error);
    process.exit(1);
  });

  p.addListener('exit', code => {
    process.exit(code ?? 0);
  });
}
