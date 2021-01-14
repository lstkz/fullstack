import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as s3 from '@aws-cdk/aws-s3';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Alias from '@aws-cdk/aws-route53-targets';
import * as iam from '@aws-cdk/aws-iam';
import Path from 'path';
import * as cf from '@aws-cdk/aws-cloudfront';
import { config, getMaybeStagePasswordEnv } from 'config';

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

function createLoadBalancer(stack: cdk.Stack, vpc: ec2.IVpc) {
  const loadBalancer = new elbv2.ApplicationLoadBalancer(stack, 'AppELB', {
    vpc,
    http2Enabled: true,
    internetFacing: true,
  });
  const lbListener = loadBalancer.addListener('HttpsListener', {
    protocol: elbv2.ApplicationProtocol.HTTPS,
    certificateArns: [config.deploy.lbCertArn],
    defaultAction: elbv2.ListenerAction.fixedResponse(200, {
      messageBody: 'ok',
    }),
  });
  loadBalancer.addListener('HttpListener', {
    protocol: elbv2.ApplicationProtocol.HTTP,
    defaultAction: elbv2.ListenerAction.redirect({
      protocol: elbv2.ApplicationProtocol.HTTPS,
      port: '443',
      permanent: true,
    }),
  });
  return { loadBalancer, lbListener };
}

function createTasks(
  stack: cdk.Stack,
  cluster: ecs.Cluster,
  dockerImage: ecs.AssetImage,
  lbListener: elbv2.ApplicationListener,
  bucket: s3.Bucket
) {
  const apiTask = new ecs.Ec2TaskDefinition(stack, 'ApiTask', {});
  const workerTask = new ecs.Ec2TaskDefinition(stack, 'WorkerTask', {});
  const webTask = new ecs.Ec2TaskDefinition(stack, 'WebTask', {});

  const taskPolicy = new iam.PolicyStatement();
  taskPolicy.addAllResources();
  taskPolicy.addActions('ses:sendEmail');
  taskPolicy.addActions('ec2:*');
  taskPolicy.addActions('route53:*');
  apiTask.addToTaskRolePolicy(taskPolicy);
  workerTask.addToTaskRolePolicy(taskPolicy);

  const s3Policy = new iam.PolicyStatement();
  s3Policy.addResources(bucket.bucketArn);
  s3Policy.addActions('s3:*');
  apiTask.addToTaskRolePolicy(s3Policy);
  workerTask.addToTaskRolePolicy(s3Policy);

  const apiContainer = apiTask.addContainer('ApiContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:api'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'api',
    }),
    memoryLimitMiB: config.deploy.api.memory,
    cpu: config.deploy.api.cpu,
    environment: getMaybeStagePasswordEnv(),
  });
  apiContainer.addPortMappings({
    hostPort: 0,
    containerPort: config.api.port,
  });

  workerTask.addContainer('WorkerContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:worker'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'worker',
    }),
    memoryLimitMiB: config.deploy.worker.memory,
    cpu: config.deploy.worker.cpu,
    environment: getMaybeStagePasswordEnv(),
  });
  const webEnv: Record<string, string> = getMaybeStagePasswordEnv();
  if (config.deploy.cdn) {
    webEnv.CDN_DOMAIN = 'https://' + config.deploy.cdn.domainName;
  }
  const webContainer = webTask.addContainer('WebContainer', {
    image: dockerImage,
    command: ['yarn', 'run', 'start:web'],
    logging: ecs.LogDriver.awsLogs({
      streamPrefix: 'web',
    }),
    memoryLimitMiB: config.deploy.web.memory,
    cpu: config.deploy.web.cpu,
    environment: webEnv,
  });
  webContainer.addPortMappings({
    hostPort: 0,
    containerPort: config.web.port,
  });

  const apiService = new ecs.Ec2Service(stack, 'ApiService', {
    cluster,
    taskDefinition: apiTask,
    desiredCount: config.deploy.api.count,
    healthCheckGracePeriod: cdk.Duration.seconds(10),
  });
  new ecs.Ec2Service(stack, 'WorkerService', {
    cluster,
    taskDefinition: workerTask,
    desiredCount: config.deploy.worker.count,
  });
  const webService = new ecs.Ec2Service(stack, 'WebService', {
    cluster,
    taskDefinition: webTask,
    desiredCount: config.deploy.web.count,
    healthCheckGracePeriod: cdk.Duration.seconds(10),
  });
  apiService.registerLoadBalancerTargets({
    containerName: 'ApiContainer',
    containerPort: config.api.port,
    newTargetGroupId: 'ApiGroup',
    listener: ecs.ListenerConfig.applicationListener(lbListener, {
      deregistrationDelay: cdk.Duration.seconds(10),
      healthCheck: {},
      conditions: [
        elbv2.ListenerCondition.hostHeaders([config.deploy.lbDomain]),
        elbv2.ListenerCondition.pathPatterns(['/rpc/*', '/socket']),
      ],
      priority: 10,
      stickinessCookieDuration: cdk.Duration.minutes(2),
    }),
  });
  webService.registerLoadBalancerTargets({
    containerName: 'WebContainer',
    containerPort: config.web.port,
    newTargetGroupId: 'WebGroup',
    listener: ecs.ListenerConfig.applicationListener(lbListener, {
      deregistrationDelay: cdk.Duration.seconds(20),
      healthCheck: {},
      conditions: [
        elbv2.ListenerCondition.hostHeaders([config.deploy.lbDomain]),
      ],
      priority: 20,
      stickinessCookieDuration: cdk.Duration.minutes(2),
    }),
  });
}

function createCDN(stack: cdk.Stack) {
  const cfIdentity = new cf.OriginAccessIdentity(
    stack,
    'CloudFrontOriginAccessIdentity',
    {}
  );

  const cdnBucket = new s3.Bucket(stack, 'CDNBucket', {
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    cors: [
      {
        allowedOrigins: ['*'],
        allowedMethods: [s3.HttpMethods.GET],
      },
    ],
  });
  cdnBucket.grantRead(cfIdentity);

  const distribution = new cf.CloudFrontWebDistribution(stack, 'CDNDist', {
    priceClass: cf.PriceClass.PRICE_CLASS_100,
    httpVersion: cf.HttpVersion.HTTP2,
    enableIpV6: true,
    errorConfigurations: [],
    viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    aliasConfiguration: config.deploy.cdn?.certArn
      ? {
          acmCertRef: config.deploy.cdn.certArn,
          names: [config.deploy.cdn.domainName],
        }
      : undefined,
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: cdnBucket,
          originAccessIdentity: cfIdentity,
        },
        behaviors: [
          {
            isDefaultBehavior: true,
            forwardedValues: {
              cookies: {
                forward: 'none',
              },
              queryString: false,
              headers: [
                'Origin',
                'Access-Control-Request-Headers',
                'Access-Control-Request-Method',
              ],
            },
            compress: true,
            allowedMethods: cf.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
            cachedMethods: cf.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
          },
        ],
      },
    ],
  });

  new cdk.CfnOutput(stack, 'cdnDeployBucket', {
    value: cdnBucket.bucketName,
  });

  new cdk.CfnOutput(stack, 'cdnDomainName', {
    value: distribution.distributionDomainName,
  });

  return distribution;
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

  cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
    instanceType: new ec2.InstanceType(config.deploy.vmCapacity.instanceType),
    minCapacity: config.deploy.vmCapacity.count,
    maxCapacity: config.deploy.vmCapacity.count,
  });

  const bucket = createMainBucket(stack);
  const dockerImage = ecs.ContainerImage.fromAsset(
    Path.join(__dirname, '../../..'),
    {}
  );
  const { loadBalancer, lbListener } = createLoadBalancer(stack, vpc);
  createTasks(stack, cluster, dockerImage, lbListener, bucket);
  const cdnDist = createCDN(stack);

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
    recordName: config.deploy.lbDomain,
  });
  if (config.deploy.cdn) {
    new route53.RecordSet(stack, 'CDNZoneRecord', {
      recordType: route53.RecordType.A,
      target: route53.RecordTarget.fromAlias(
        new route53Alias.CloudFrontTarget(cdnDist)
      ),
      zone,
      recordName: config.deploy.cdn.domainName,
    });
  }

  app.synth();
})().catch(e => {
  console.error(e);
  process.exit(1);
});
