import cdk = require('@aws-cdk/core');
import { ApiLambda } from './resources/ApiLambda';
import { AppWebSiteDist } from './resources/AppWebSiteDist';
import { BlogWebSiteDist } from './resources/BlogWebSiteDist';
import { GatewayApi } from './resources/GatewayApi';
import { LogLambda } from './resources/LogLambda';
import { MainBucket } from './resources/MainBucket';
import { MainTable } from './resources/MainTable';
import { MainTopic } from './resources/MainTopic';

if (!process.env.STACK_NAME) {
  throw new Error('STACK_NAME is not set');
}

export class MainStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);
  }
  async create() {
    const initOnly = process.env.INIT_STACK === '1';
    const mainTopic = new MainTopic(this);
    const mainBucket = new MainBucket(this);
    const mainTable = new MainTable(this);
    const apiLambda = new ApiLambda(this, initOnly, {
      mainTopic,
      mainBucket,
      mainTable,
    });
    new GatewayApi(this, {
      apiLambda,
    });
    if (process.env.REPORT_ERROR_EMAIL) {
      new LogLambda(this, initOnly, {
        apiLambda,
        mainTopic,
        mainBucket,
        mainTable,
      });
    }
    new BlogWebSiteDist(this);
    new AppWebSiteDist(this, {
      mainBucket,
    });
  }
}

(async function () {
  const app = new cdk.App();
  const stack = new MainStack(app, process.env.STACK_NAME!);
  await stack.create();

  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
