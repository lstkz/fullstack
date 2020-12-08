import http from 'http';
import type { APIClient } from 'shared';
import { API_PORT } from '../config';

function _getBody(req: http.IncomingMessage) {
  const body: any[] = [];
  return new Promise((resolve, reject) => {
    req
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        const str = Buffer.concat(body).toString();
        try {
          resolve(JSON.parse(str));
        } catch (e) {
          reject(new Error('Invalid JSON'));
        }
      })
      .on('error', reject);
  });
}

type GetParams<T> = T extends (...args: infer U) => any ? U : never;

type GetResult<T> = T extends (...args: any[]) => Promise<infer K> ? K : never;

export class MockError extends Error {
  constructor(message: string, public status: number = 400) {
    super(message);
  }
}

export class Engine {
  private server: http.Server = null!;
  private mocks: Record<string, (...args: any[]) => any> = {};
  private requestCount: Record<string, number> = {};
  private jestFns: Record<string, jest.Mock> = {};

  private incCount(name: string) {
    if (!this.requestCount[name]) {
      this.requestCount[name] = 0;
    }
    this.requestCount[name]++;
    return this.requestCount[name];
  }

  resetMock() {
    this.mocks = {};
    this.requestCount = {};
    this.jestFns = {};
  }

  async setup() {
    const server = http.createServer(async (req, res) => {
      try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
          res.end();
          return;
        }
        const exec = /\/rpc\/(.+)/.exec(req.url!);
        if (!exec) {
          throw new Error('Invalid url');
        }
        if (req.method !== 'POST') {
          throw new Error('Method must be POST');
        }
        const body = await _getBody(req);
        if (typeof body !== 'object' || !body) {
          throw new Error('Request body must be an object');
        }
        const rpcName = exec[1].replace('.', '_');
        if (!this.mocks[rpcName]) {
          throw new Error('RPC method not mocked: ' + rpcName);
        }
        const params = Object.values(body);
        this.jestFns[rpcName](...params);
        const ret = await this.mocks[rpcName](
          this.incCount(rpcName),
          ...params
        );
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(ret ?? null, null, 2));
      } catch (e) {
        res.statusCode = e instanceof MockError ? 400 : 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify(
            {
              error: e.message,
            },
            null,
            2
          )
        );
      } finally {
        res.end();
        req.connection.end();
      }
    });
    this.server = server;
    await new Promise<void>(resolve => server.listen(API_PORT, resolve));
  }

  async dispose() {
    await new Promise<void>(resolve => this.server.close(() => resolve()));
  }
  mock<TName extends keyof APIClient>(
    name: TName,
    response: (
      count: number,
      ...params: GetParams<APIClient[TName]>
    ) => GetResult<APIClient[TName]>
  ): jest.Mock<any, GetParams<APIClient[TName]>> {
    const fn = jest.fn();
    this.jestFns[name] = fn;
    this.mocks[name] = response;
    return fn;
  }
}
