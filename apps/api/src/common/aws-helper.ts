import { EC2, Route53 } from 'aws-sdk';
import { ec2, route53, s3 } from '../lib';

export async function getInstanceByTag(tagName: string, tagValue: string) {
  const list = await ec2
    .describeInstances(
      {
        Filters: [
          {
            Name: 'tag:' + tagName,
            Values: [tagValue],
          },
        ],
      },
      undefined
    )
    .promise();
  if (!list.Reservations) {
    return null;
  }
  if (list.Reservations.length > 1) {
    throw new Error(`Expected only 1 reservation ${tagName}=${tagValue}`);
  }
  const instances = list.Reservations[0]?.Instances;
  if (!instances) {
    return null;
  }
  if (instances.length > 1) {
    throw new Error(`Expected only 1 instance ${tagName}=${tagValue}`);
  }

  return instances[0];
}

export async function getInstanceById(id: string) {
  const list = await ec2
    .describeInstances(
      {
        InstanceIds: [id],
      },
      undefined
    )
    .promise();
  const instance = list.Reservations?.[0].Instances?.[0];
  if (!instance) {
    throw new Error(`Instance not found with id: ${instance}`);
  }
  return instance;
}

export async function resumeInstance(id: string) {
  await ec2
    .startInstances(
      {
        InstanceIds: [id],
      },
      undefined
    )
    .promise();
}

export async function stopInstance(id: string) {
  await ec2
    .stopInstances(
      {
        InstanceIds: [id],
      },
      undefined
    )
    .promise();
}

export async function runInstance(
  params: Omit<EC2.Types.RunInstancesRequest, 'MinCount' | 'MaxCount'>
) {
  const ret = await ec2
    .runInstances({
      ...params,
      MinCount: 1,
      MaxCount: 1,
    })
    .promise();
  if (ret.Instances?.length !== 1) {
    throw new Error(
      `Expected 1 instance to be created, got: ${ret.Instances?.length}`
    );
  }
  return ret.Instances[0];
}

export async function getZoneRecord(zoneId: string, domain: string) {
  const ret = await route53
    .listResourceRecordSets(
      {
        HostedZoneId: zoneId,
        StartRecordName: domain,
        MaxItems: '1',
      },
      undefined
    )
    .promise();
  return ret.ResourceRecordSets.find(x => x.Name === domain + '.');
}

export async function removeZoneRecord(
  zoneId: string,
  record: Route53.ResourceRecordSet
) {
  await route53
    .changeResourceRecordSets(
      {
        HostedZoneId: zoneId,
        ChangeBatch: {
          Changes: [
            {
              Action: 'DELETE',
              ResourceRecordSet: record,
            },
          ],
        },
      },
      undefined
    )
    .promise();
}

export async function createZoneRecord(
  zoneId: string,
  domain: string,
  ip: string
) {
  const ret = await route53
    .changeResourceRecordSets(
      {
        HostedZoneId: zoneId,
        ChangeBatch: {
          Changes: [
            {
              Action: 'CREATE',
              ResourceRecordSet: {
                Name: domain,
                ResourceRecords: [
                  {
                    Value: ip,
                  },
                ],
                TTL: 60,
                Type: 'A',
              },
            },
          ],
        },
      },
      undefined
    )
    .promise();
  return ret.ChangeInfo.Id;
}

export async function getZoneChangeStatus(changeId: string) {
  const ret = await route53
    .getChange(
      {
        Id: changeId,
      },
      undefined
    )
    .promise();
  return ret.ChangeInfo.Status as 'PENDING' | 'INSYNC';
}

export async function checkS3KeyExists(bucketName: string, key: string) {
  return await s3
    .headObject({
      Bucket: bucketName,
      Key: key,
    })
    .promise()
    .then(
      () => true,
      err => {
        if (err.code === 'NotFound') {
          return false;
        }
        throw err;
      }
    );
}
