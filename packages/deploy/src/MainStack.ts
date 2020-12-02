import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import Path from 'path';

if (!process.env.STACK_NAME) {
  throw new Error('STACK_NAME is not set');
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
  const loadBalancedEcsService = new ecsPatterns.ApplicationLoadBalancedFargateService(
    stack,
    'Service2',
    {
      cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(
          Path.join(__dirname, '../../../apps/api2')
        ),
        logDriver: ecs.LogDriver.awsLogs({
          streamPrefix: 'app',
        }),
        containerPort: 4100,
      },
      desiredCount: 1,
      assignPublicIp: true,
    }
  );
  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
