import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as ecr from '@aws-cdk/aws-ecr';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import Path from 'path';

import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import { LogDriver } from '@aws-cdk/aws-ecs';

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
  // const vpc2 = new ec2.Vpc(app)

  const cluster = new ecs.Cluster(stack, 'AppCluster', {
    vpc,
    containerInsights: true,
  });
  // const autoScalingGroup = cluster.addCapacity(
  //   'DefaultAutoScalingGroupCapacity',
  //   {
  //     instanceType: new ec2.InstanceType('t4g.small'),
  //     minCapacity: 3,
  //     maxCapacity: 3,
  //     machineImage: ec2.MachineImage.genericLinux({
  //       'eu-central-1': 'ami-0faaa13d4512c933d',
  //     }),
  //   }
  // );
  // autoScalingGroup.
  // const vmSecurityGroup = new ec2.SecurityGroup(stack, 'vmSecurityGroup', {
  //   vpc,
  //   allowAllOutbound: true,
  // });
  // vmSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(4100));
  // autoScalingGroup.addSecurityGroup(vmSecurityGroup);

  // const taskDefinition = new ecs.Ec2TaskDefinition(stack, 'TaskDef');

  // const container = taskDefinition.addContainer('AppContainer', {
  //   image: ecs.ContainerImage.fromAsset(
  //     Path.join(__dirname, '../../../apps/api2')
  //   ),
  //   logging: ecs.LogDriver.awsLogs({
  //     streamPrefix: 'app',
  //   }),
  //   // memoryLimitMiB: 512,
  //   // cpu: 1024,
  // });
  // container.addPortMappings({
  //   containerPort: 4100,
  //   hostPort: 4100,
  // });

  const loadBalancedEcsService = new ecsPatterns.ApplicationLoadBalancedFargateService(
    stack,
    'Service2',
    {
      cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      // taskDefinition,
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

  // const lb = new elbv2.ApplicationLoadBalancer(stack, 'LB', {
  //   vpc,
  //   internetFacing: true,
  // });
  // const listener = lb.addListener('Listener', {
  //   port: 80,
  //   open: true,
  // });

  // listener.addTargets('ApplicationFleet', {
  //   protocol: elbv2.ApplicationProtocol.HTTP,
  //   port: 4100,
  //   targets: [autoScalingGroup],
  // });

  // new cdk.CfnOutput(stack, 'api', {
  //   value: lb.loadBalancerDnsName,
  // });

  // const repo = new ecr.Repository(stack, 'app', {});

  // const asset = new DockerImageAsset(stack, 'AppImage', {
  //   directory: Path.join(__dirname, '../../../apps/api2'),
  //   repositoryName: repo.repositoryName,
  // });

  // Instantiate an Amazon ECS Service
  // const ecsService = new ecs.Ec2Service(stack, 'Service', {
  //   cluster,
  //   taskDefinition,
  //   desiredCount: 2,
  // });

  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
