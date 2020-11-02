import { S } from 'schema';
import { Foo } from 'shared';
import { createContract, createRpcBinding } from '../../lib';

export const createFoo = createContract('example.createFoo')
  .params('values')
  .schema({
    values: S.object().keys({
      foo: S.string(),
    }),
  })
  .returns<Foo>()
  .fn(async values => {
    return {
      id: 'abc',
      foo: 'foo',
      bar: 'bar',
    };
  });

export const createFooRpc = createRpcBinding({
  public: true,
  signature: 'example.createFoo',
  handler: createFoo,
});
