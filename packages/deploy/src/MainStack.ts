import cdk = require('@aws-cdk/core');
import { BlogWebSiteDist } from './resources/BlogWebSiteDist';
import { MainBucket } from './resources/MainBucket';

if (!process.env.STACK_NAME) {
  throw new Error('STACK_NAME is not set');
}

export class MainStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);
  }
  async create() {
    const mainBucket = new MainBucket(this);
    new BlogWebSiteDist(this, {
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
