import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as s3 from '@aws-cdk/aws-s3';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Alias from '@aws-cdk/aws-route53-targets';
import * as iam from '@aws-cdk/aws-iam';
import Path from 'path';
import { createWebDist } from './createWebDist';
import { config, getPasswordEnv } from 'config';

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
  return {
    NODE_ENV: 'production',
    ...getPasswordEnv(),
  };
}

function createLoadBalancer(stack: cdk.Stack, vpc: ec2.IVpc) {
  const loadBalancer = new elbv2.ApplicationLoadBalancer(stack, 'AppELB', {
    vpc,
    http2Enabled: true,
    internetFacing: true,
  });
  if (config.deploy.apiCertArn === -1) {
    throw new Error('Api Cert must be set');
  }
  const lbListener = loadBalancer.addListener('HttpsListener', {
    protocol: elbv2.ApplicationProtocol.HTTPS,
    certificateArns: [config.deploy.apiCertArn],
    defaultAction: elbv2.ListenerAction.fixedResponse(200, {
      messageBody: 'ok',
    }),
  });
  return { loadBalancer, lbListener };
}

function createApiTask(
  stack: cdk.Stack,
  cluster: ecs.Cluster,
  dockerImage: ecs.AssetImage,
  lbListener: elbv2.ApplicationListener,
  loadBalancer: elbv2.ApplicationLoadBalancer
) {
  const appTask = new ecs.FargateTaskDefinition(stack, 'AppTask', {
    memoryLimitMiB: config.deploy.task.memory,
    cpu: config.deploy.task.cpu,
  });

  const taskPolicy = new iam.PolicyStatement();
  taskPolicy.addAllResources();
  taskPolicy.addActions('ses:sendEmail');
  appTask.addToTaskRolePolicy(taskPolicy);

  const apiContainer = appTask.addContainer('ApiContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:api'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'api',
    }),
    environment: getDockerEnv(),
  });
  apiContainer.addPortMappings({
    containerPort: config.api.port,
  });

  appTask.addContainer('WorkerContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:worker'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'worker',
    }),
    environment: getDockerEnv(),
  });

  const webContainer = appTask.addContainer('WebContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:web'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'web',
    }),
    environment: getDockerEnv(),
  });
  webContainer.addPortMappings({
    containerPort: config.web.port,
  });

  const service = new ecs.FargateService(stack, 'AppService', {
    cluster,
    taskDefinition: appTask,
    desiredCount: config.deploy.task.count,
    assignPublicIp: true,
  });
  service.registerLoadBalancerTargets({
    containerName: 'ApiContainer',
    containerPort: config.api.port,
    newTargetGroupId: 'ApiGroup',
    listener: ecs.ListenerConfig.applicationListener(lbListener, {
      deregistrationDelay: cdk.Duration.seconds(10),
      healthCheck: {},
      conditions: [
        elbv2.ListenerCondition.hostHeaders(['fs.styx-dev.com']),
        elbv2.ListenerCondition.pathPatterns(['/rpc/*']),
      ],
      priority: 10,
      stickinessCookieDuration: cdk.Duration.minutes(2),
    }),
  });
  service.registerLoadBalancerTargets({
    containerName: 'WebContainer',
    containerPort: config.web.port,
    newTargetGroupId: 'WebGroup',
    listener: ecs.ListenerConfig.applicationListener(lbListener, {
      deregistrationDelay: cdk.Duration.seconds(10),
      healthCheck: {},
      conditions: [elbv2.ListenerCondition.hostHeaders(['fs.styx-dev.com'])],
      priority: 20,
      stickinessCookieDuration: cdk.Duration.minutes(2),
    }),
  });

  if (config.deploy.zone === -1) {
    throw new Error('zone must be set');
  }

  const zone = route53.HostedZone.fromHostedZoneAttributes(
    stack,
    'zone',
    config.deploy.zone
  );
  new route53.RecordSet(stack, 'AppZoneRecord', {
    recordType: route53.RecordType.A,
    target: route53.RecordTarget.fromAlias(
      new route53Alias.LoadBalancerTarget(loadBalancer)
    ),
    zone,
    recordName: 'fs.styx-dev.com',
  });
}

// function createWebTask(
//   stack: cdk.Stack,
//   cluster: ecs.Cluster,
//   dockerImage: ecs.AssetImage,
//   lbListener: elbv2.ApplicationListener
// ) {
//   const apiTask = new ecs.FargateTaskDefinition(stack, 'WebTask', {});
//   const apiContainer = apiTask.addContainer('WebContainer', {
//     image: dockerImage,
//     memoryLimitMiB: config.deploy.web.memory,
//     cpu: config.deploy.web.cpu,
//     command: ['yarn', 'run', 'start:web'],
//     logging: ecs.LogDriver.awsLogs({
//       streamPrefix: 'web',
//     }),
//     environment: getDockerEnv(),
//   });
//   apiContainer.addPortMappings({
//     containerPort: config.web.port,
//   });
//   const service = new ecs.FargateService(stack, 'WebService', {
//     cluster,
//     taskDefinition: apiTask,
//     desiredCount: config.deploy.web.count,
//     assignPublicIp: true,
//   });
//   service.registerLoadBalancerTargets({
//     containerName: 'WebContainer',
//     containerPort: config.web.port,
//     newTargetGroupId: 'ECSWeb',
//     listener: ecs.ListenerConfig.applicationListener(lbListener, {
//       deregistrationDelay: cdk.Duration.seconds(10),
//       conditions: [
//         elbv2.ListenerCondition.hostHeaders(['fs-app.styx-dev.com']),
//       ],
//       priority: 2,
//     }),
//   });
// }

// function createDomainAliases(
//   stack: cdk.Stack,
//   loadBalancer: elbv2.ApplicationLoadBalancer
// ) {
//   if (config.deploy.zone === -1) {
//     throw new Error('zone must be set');
//   }
//   const zone = route53.HostedZone.fromHostedZoneAttributes(
//     stack,
//     'zone',
//     config.deploy.zone
//   );
//   new route53.RecordSet(stack, 'ApiZoneRecord', {
//     recordType: route53.RecordType.A,
//     target: route53.RecordTarget.fromAlias(
//       new route53Alias.LoadBalancerTarget(loadBalancer)
//     ),
//     zone,
//     recordName: 'fs-api.styx-dev.com',
//   });
//   new route53.RecordSet(stack, 'AppZoneRecord', {
//     recordType: route53.RecordType.A,
//     target: route53.RecordTarget.fromAlias(
//       new route53Alias.LoadBalancerTarget(loadBalancer)
//     ),
//     zone,
//     recordName: 'fs-app.styx-dev.com',
//   });
// }

// function createWorkerTask(
//   stack: cdk.Stack,
//   cluster: ecs.Cluster,
//   dockerImage: ecs.AssetImage
// ) {
//   const workerTask = new ecs.FargateTaskDefinition(stack, 'WorkerTask', {});
//   workerTask.addContainer('WorkerContainer', {
//     image: dockerImage,
//     memoryLimitMiB: config.deploy.worker.memory,
//     cpu: config.deploy.worker.cpu,
//     command: ['yarn', 'run', 'start:worker'],
//     logging: ecs.LogDriver.awsLogs({
//       streamPrefix: 'worker',
//     }),
//     environment: getDockerEnv(),
//   });
//   const workerPolicy = new iam.PolicyStatement();
//   workerPolicy.addAllResources();
//   workerPolicy.addActions('ses:sendEmail');
//   workerTask.addToTaskRolePolicy(workerPolicy);
//   new ecs.FargateService(stack, 'WorkerService', {
//     cluster,
//     taskDefinition: workerTask,
//     assignPublicIp: true,
//     desiredCount: config.deploy.worker.count,
//   });
// }

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
  const { loadBalancer, lbListener } = createLoadBalancer(stack, vpc);
  createApiTask(stack, cluster, dockerImage, lbListener, loadBalancer);
  // createWebTask(stack, cluster, dockerImage, lbListener);
  // createWorkerTask(stack, cluster, dockerImage);
  // createDomainAliases(stack, loadBalancer);
  createWebDist(stack, bucket);
  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
