import fs from 'fs';
import Path from 'path';
import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import { S, validate, ValidationError } from 'schema';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import http from 'http';
import cp from 'child_process';

async function getInstanceId() {
  const res = await fetch(
    'http://169.254.169.254/latest/meta-data/instance-id'
  );
  if (res.status !== 200) {
    throw new Error('Cannot get instance id');
  }
  return (await res.text()).trim();
}

function runCommand(cmd: string, cwd?: string) {
  return new Promise<void>((resolve, reject) => {
    const p = cp.spawn(cmd, {
      shell: true,
      stdio: 'inherit',
      cwd: cwd,
      env: {
        ...process.env,
      },
    });
    p.addListener('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('Exited with ' + code));
      }
    });
    p.addListener('error', e => reject(e));
  });
}

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

function wrapRoute(fn: Handler): Handler {
  return (req, res, next) => {
    try {
      const result = fn(req, res, next) as any;
      if (result && result.catch) {
        result.catch(next);
      }
    } catch (e) {
      next(e);
    }
  };
}

async function start() {
  const instanceId = await getInstanceId();
  const PORT = 17775;
  const app = express();
  app.use(bodyParser.json());

  app.get('/ping', (req, res) => {
    res.json({
      ok: true,
    });
  });

  app.use((req, res, next) => {
    if (!req.headers['x-instance-id']) {
      res.status(401);
      res.json({
        error: 'x-instance-id not set',
      });
      return;
    }
    if (req.headers['x-instance-id'] !== instanceId) {
      res.status(401);
      res.json({
        error: 'invalid x-instance-id',
      });
      return;
    }
    next();
  });

  app.post(
    '/folder',
    wrapRoute(async (req, res) => {
      const schema = S.object().keys({
        folderPath: S.string(),
        downloadUrl: S.string(),
        setupCommand: S.string(),
      });
      const body = validate(req.body, schema);
      await runCommand(`rm -rf ${body.folderPath}`);
      await runCommand(`mkdir -p ${body.folderPath}`);
      await runCommand(
        `wget -c ${body.downloadUrl} -O - | tar -xz`,
        body.folderPath
      );
      await runCommand(body.setupCommand, body.folderPath);
      res.json({
        ok: true,
      });
    })
  );

  app.post(
    '/setup',
    wrapRoute(async (req, res) => {
      const schema = S.object().keys({
        domainName: S.string(),
        cert: S.string(),
        certKey: S.string(),
      });
      const body = validate(req.body, schema);
      const nginxConfigPath = Path.join(__dirname, 'code-server.conf');
      const certPath = Path.join(__dirname, 'cert.pem');
      const certKeyPath = Path.join(__dirname, 'cert.key');

      fs.writeFileSync(
        nginxConfigPath,
        `
server {
  listen   443 ssl;
  ssl_certificate    /etc/ssl/cert.pem;
  ssl_certificate_key    /etc/ssl/cert.key;

  server_name ${body.domainName};

  location / {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection upgrade;
    proxy_set_header Accept-Encoding gzip;
  }
}
      `.trim()
      );

      fs.writeFileSync(certPath, body.cert);
      fs.writeFileSync(certKeyPath, body.certKey);

      await runCommand(
        [
          `sudo mv ${nginxConfigPath} /etc/nginx/conf.d/code-server.conf`,
          `sudo mv ${certPath} /etc/ssl/cert.pem`,
          `sudo mv ${certKeyPath} /etc/ssl/cert.key`,
          'sudo systemctl restart nginx',
        ].join(' && ')
      );

      res.json({
        ok: true,
      });
    })
  );

  app.use(((err, req, res, next) => {
    console.error(err);
    if (err instanceof ValidationError) {
      res.status(400);
      res.json({
        error: 'Validation Error',
      });
    } else {
      res.status(500);
      res.json({
        error: 'Internal Server error',
      });
    }
  }) as ErrorRequestHandler);
  const server = http.createServer(app);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(
      `Express HTTP server listening on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
}

start().catch(e => {
  console.error(e);
  process.exit(1);
});
