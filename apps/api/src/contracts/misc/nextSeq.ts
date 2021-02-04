import { S } from 'schema';
import { SeqCollection } from '../../collections/Seq';
import { DUPLICATED_UNIQUE_VALUE_ERROR_CODE } from '../../common/mongo';
import { createContract } from '../../lib';

export const nextSeq = createContract('misc.nextSeq')
  .params('name')
  .schema({
    name: S.string(),
  })
  .returns<number>()
  .fn(async name => {
    let retry = 10;
    while (retry--) {
      try {
        const ret = await SeqCollection.findOneAndUpdate(
          {
            _id: name,
          },
          {
            $inc: {
              seq: 1,
            },
          },
          {
            upsert: true,
            returnOriginal: false,
          }
        );
        if (!ret.value) {
          throw new Error('Expected value to be defined');
        }
        return ret.value.seq;
      } catch (e) {
        if (e.code !== DUPLICATED_UNIQUE_VALUE_ERROR_CODE) {
          throw e;
        }
      }
    }
    throw new Error('Cannot generate sequence');
  });
