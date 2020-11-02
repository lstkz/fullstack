import { createRpcBinding } from '../lib';

type BindingResult = ReturnType<typeof createRpcBinding>;

interface ApiMapping {
  [x: string]: () => Promise<BindingResult>;
}
export const apiMapping: ApiMapping = {
  'example.createFoo': () =>
    import(
      /* webpackChunkName: "example.createFoo"*/ '../contracts/example/createFoo'
    ).then(x => x['createFooRpc']),
};
