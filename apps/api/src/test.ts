process.env.AWS_REGION = 'eu-central-1';

import { config } from 'config';
import { randomString } from './common/helper';
import { ec2, route53, s3 } from './lib';
import { getInstanceByTag, runInstance } from './common/aws-helper';
import { connect } from './db';
import { getActiveTask } from './contracts/module/getTask';

async function start() {
  // const vmId = '12345ff44';

  // const list = await ec2
  //   .describeInstances(
  //     {
  //       Filters: [
  //         {
  //           Name: 'tag:fsID',
  //           Values: [vmId],
  //         },
  //       ],
  //     },
  //     undefined
  //   )
  //   .promise();

  // console.log(list.Reservations?.length);
  // console.log(list.Reservations?.[0]?.Instances);

  // if (!list.Reservations?.length) {
  //   const ret = await ec2
  //     .runInstances(
  //       {
  //         ImageId: config.vm.imageId,
  //         InstanceType: config.vm.instanceType,
  //         KeyName: config.vm.keyName,
  //         MinCount: 1,
  //         MaxCount: 1,
  //         SecurityGroupIds: [config.vm.securityGroup],
  //         TagSpecifications: [
  //           {
  //             ResourceType: 'instance',
  //             Tags: [
  //               {
  //                 Key: 'fsID',
  //                 Value: vmId,
  //               },
  //               {
  //                 Key: 'userId',
  //                 Value: '123',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       undefined
  //     )
  //     .promise();
  //   const instance = ret.Instances?.[0];
  //   instance?.PublicIpAddress;
  //   console.log(instance);
  // }

  // const domainPrefix = randomString(10).toLowerCase();

  // const domain = `${domainPrefix}.${config.vm.baseDomain}`;
  // const ip = '18.192.21.23';
  // const ret = await route53
  //   .changeResourceRecordSets(
  //     {
  //       HostedZoneId: config.vm.zoneId,
  //       ChangeBatch: {
  //         Changes: [
  //           {
  //             Action: 'CREATE',
  //             ResourceRecordSet: {
  //               Name: domain,
  //               ResourceRecords: [
  //                 {
  //                   Value: ip,
  //                 },
  //               ],
  //               TTL: 60,
  //               Type: 'A',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     undefined
  //   )
  //   .promise();

  // console.log(ret);

  // const ret2 = await route53
  //   .getChange(
  //     {
  //       Id: '/change/C043012813ES8ATS38GV7',
  //     },
  //     undefined
  //   )
  //   .promise();

  // const recordName = 'al53wdqska.fs-vm.styx-dev.com';
  // const ret3 = await route53
  //   .listResourceRecordSets(
  //     {
  //       HostedZoneId: config.vm.zoneId,
  //       StartRecordName: recordName,
  //       MaxItems: '1',
  //     },
  //     undefined
  //   )
  //   .promise();
  // const target = ret3.ResourceRecordSets.find(x => x.Name === recordName + '.');

  // console.log(target);

  // const ret = await runInstance({
  //   LaunchTemplate: {
  //     LaunchTemplateId: config.vm.launchTemplateId,
  //   },
  //   SubnetId: 'subnet-03f5a1ccf774f3927',
  //   TagSpecifications: [
  //     {
  //       ResourceType: 'instance',
  //       Tags: [
  //         {
  //           Key: 'fsID',
  //           Value: 'test',
  //         },
  //         {
  //           Key: 'userId',
  //           Value: '123',
  //         },
  //       ],
  //     },
  //   ],
  // });
  // console.log(ret);

  await connect();
  const task = await getActiveTask('1-ts-basics', 1);
  console.log({
    // Bucket: config.aws.s3Bucket,
    Key: task.sourceS3Key,
  });
  const downloadUrl = config.cdnBaseUrl + '/' + task.sourceS3Key;
  // const downloadUrl = await s3.getSignedUrlPromise('getObject', {
  //   Bucket: config.aws.s3CDNBucket,
  //   Key: task.sourceS3Key,
  // });
  console.log(downloadUrl);
  process.exit(0);
}

void start();
