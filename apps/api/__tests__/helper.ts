import { dynamodb } from '../src/lib';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { TABLE_NAME } from '../src/config';
import { esClearIndex, exIndexBulk } from '../src/common/elastic';
import { ContractMeta } from 'contract';
import { Convert } from 'schema';
import { handler } from '../src/handler';

export async function resetDb() {
  const deleteNext = async () => {
    const ret = await dynamodb
      .scan({
        TableName: TABLE_NAME,
      })
      .promise();

    if (!ret.Count) {
      return;
    }

    await Promise.all(
      (ret.Items || []).map(item =>
        dynamodb
          .deleteItem({
            TableName: TABLE_NAME,
            Key: {
              pk: item.pk,
              sk: item.sk,
            },
          })
          .promise()
      )
    );

    await deleteNext();
  };

  await deleteNext();
}

export async function esReIndexFromDynamo(entityType: string) {
  const ret = await dynamodb
    .scan(
      {
        TableName: TABLE_NAME,
        FilterExpression: `entityType = :entityType`,
        ExpressionAttributeValues: {
          ':entityType': { S: entityType },
        },
      },
      undefined
    )
    .promise();
  await esClearIndex(entityType);
  await exIndexBulk(
    ret!.Items!.map(item => ({
      type: 'index',
      entity: Converter.unmarshall(item) as any,
    }))
  );
}
type ExtractParams<T> = T extends ContractMeta<infer S>
  ? Omit<
      Convert<
        {
          [P in keyof S]: Convert<S[P]>;
        }
      >,
      'user'
    >
  : never;

export function execContract<
  T extends ((...args: any[]) => any) & ContractMeta<any>
>(contract: T, params: ExtractParams<T>, accessToken?: string): ReturnType<T> {
  return handler(contract.getSignature(), params, accessToken) as any;
}
