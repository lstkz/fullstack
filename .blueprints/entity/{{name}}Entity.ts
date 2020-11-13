import { createBaseEntity } from '../lib';

export interface {{name}}Key {
  foo: string;
}

export interface {{name}}Props extends {{name}}Key {
  bar: string;
}

const BaseEntity = createBaseEntity('{{snakeCase name}}')
  .props<{{name}}Props>()
  .key<{{name}}Key>(key => `$:${key.foo}`)
  .key<{{name}}Key>(key => ({
    pk: `$:${key.foo}`,
    sk: `$:${key.bar}`,
  }))
  .build();

export class {{name}}Entity extends BaseEntity {}
