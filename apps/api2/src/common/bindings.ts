import * as R from 'remeda';
import {
  BaseBinding,
  CreateEventBindingOptions,
  CreateRpcBindingOptions,
  CreateTaskBindingOptions,
} from '../lib';

const bindings = [
  require('../contracts/notification/sendEmail'),
  require('../contracts/subscription/confirmSubscription'),
  require('../contracts/subscription/subscribe'),
  require('../contracts/subscription/unsubscribe'),
];

export function getBindings(type: 'rpc'): CreateRpcBindingOptions[];
export function getBindings(type: 'event'): CreateEventBindingOptions<any>[];
export function getBindings(type: 'task'): CreateTaskBindingOptions<any>[];
export function getBindings(
  type: 'rpc' | 'event' | 'task'
):
  | CreateRpcBindingOptions[]
  | CreateEventBindingOptions<any>[]
  | CreateTaskBindingOptions<any>[] {
  return R.pipe(
    bindings,
    R.flatMap(obj => Object.values(obj) as BaseBinding<string, any>[]),
    R.filter(x => x.isBinding && x.type === type),
    R.map(x => x.options)
  );
}
