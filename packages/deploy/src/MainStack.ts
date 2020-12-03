import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as s3 from '@aws-cdk/aws-s3';
import Path from 'path';
import { createWebDist } from './createWebDist';
import { config } from 'config';

if (!process.env.STACK_NAME) {
  throw new Error('STACK_NAME is not set');
}

function createMainBucket(stack: cdk.Stack) {
  const bucket = new s3.Bucket(stack, 'Bucket', {
    cors: [
      {
        allowedOrigins: ['*'],
        allowedMethods: [s3.HttpMethods.POST],
      },
    ],
  });

  new cdk.CfnOutput(stack, 'bucketName', {
    value: bucket.bucketName,
  });
  return bucket;
}

function getDockerEnv() {
  const passProp = (process.env.CONFIG_NAME + '_CONFIG_PASSWORD').toUpperCase();
  if (!process.env[passProp]) {
    throw new Error(`${passProp} is not set`);
  }
  return {
    NODE_ENV: 'production',
    CONFIG_NAME: process.env.CONFIG_NAME!,
    [passProp]: process.env[passProp]!,
  };
}

function createApiTask(
  stack: cdk.Stack,
  cluster: ecs.Cluster,
  dockerImage: ecs.AssetImage
) {
  const apiTask = new ecs.FargateTaskDefinition(stack, 'ApiTask', {});
  const apiContainer = apiTask.addContainer('ApiContainer', {
    image: dockerImage,
    memoryLimitMiB: config.deploy.api.memory,
    cpu: config.deploy.api.cpu,
    command: ['yarn', 'run', 'start:api'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'api',
    }),
    environment: getDockerEnv(),
  });
  apiContainer.addPortMappings({
    containerPort: config.api.port,
  });
  new ecsPatterns.ApplicationLoadBalancedFargateService(stack, 'ApiService', {
    cluster,
    memoryLimitMiB: config.deploy.api.memory,
    cpu: config.deploy.api.cpu,
    taskDefinition: apiTask,
    desiredCount: config.deploy.api.count,
    assignPublicIp: true,
  });
}

function createWorkerTask(
  stack: cdk.Stack,
  cluster: ecs.Cluster,
  dockerImage: ecs.AssetImage
) {
  const workerTask = new ecs.FargateTaskDefinition(stack, 'WorkerTask', {});
  workerTask.addContainer('WorkerContainer', {
    image: dockerImage,
    memoryLimitMiB: config.deploy.worker.memory,
    cpu: config.deploy.worker.cpu,
    command: ['yarn', 'run', 'start:worker'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'worker',
    }),
    environment: getDockerEnv(),
  });
  new ecs.FargateService(stack, 'WorkerService', {
    cluster,
    taskDefinition: workerTask,
    assignPublicIp: true,
    desiredCount: config.deploy.worker.count,
  });
}

(async function () {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, process.env.STACK_NAME!, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  const vpc = ec2.Vpc.fromLookup(stack, 'vpc', {
    isDefault: true,
  });
  const cluster = new ecs.Cluster(stack, 'AppCluster', {
    vpc,
    containerInsights: true,
  });
  const bucket = createMainBucket(stack);
  const dockerImage = ecs.ContainerImage.fromAsset(
    Path.join(__dirname, '../../..')
  );
  createApiTask(stack, cluster, dockerImage);
  createWorkerTask(stack, cluster, dockerImage);
  createWebDist(stack, bucket);
  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
