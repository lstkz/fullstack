import * as R from 'remeda';
import Path from 'path';
import fs from 'fs';
import { AsyncLocalStorage } from 'async_hooks';
import { config } from 'config';
import {
  MongoClient,
  FilterQuery,
  MongoCountPreferences,
  FindOneOptions,
  FindOneAndDeleteOption,
  FindOneAndUpdateOption,
  UpdateQuery,
  FindOneAndReplaceOption,
  CollectionInsertOneOptions,
  InsertOneWriteOpResult,
  Cursor,
  FindAndModifyWriteOpResultObject,
  IndexSpecification,
  DeleteWriteOpResultObject,
  CommonOptions,
  InsertWriteOpResult,
  CollectionInsertManyOptions,
  OptionalId,
  WithId,
  ClientSession,
  CollectionAggregationOptions,
} from 'mongodb';
const dbSessionStorage = new AsyncLocalStorage<ClientSession>();

let client: MongoClient | null = null;

export async function disconnect() {
  await client?.close();
}

export async function connect() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await client.connect();

  return client;
}

async function startSession() {
  if (!client) {
    throw new Error('Not connected');
  }
  return client.startSession();
}

export async function withTransaction<T extends () => Promise<R>, R>(fn: T) {
  const session = await startSession();
  try {
    return await dbSessionStorage.run(session, async () => {
      return session.withTransaction(fn);
    });
  } finally {
    session.endSession();
  }
}

function getClient() {
  if (!client) {
    throw new Error('client is not set');
  }
  return client;
}

type ExtractId<T> = T extends { _id: infer U } ? U : never;

interface CustomDbCollection<TSchema> {
  findAll<T = TSchema>(
    query: FilterQuery<TSchema>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<T[]>;
  findById<T = TSchema>(
    id: ExtractId<T>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<T | null>;
  findByIdOrThrow<T = TSchema>(
    id: ExtractId<T>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<T>;
  findOneOrThrow<T = TSchema>(
    filter: FilterQuery<TSchema>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<T>;
  deleteById<T = TSchema>(
    id: ExtractId<T>,
    options?: CommonOptions
  ): Promise<DeleteWriteOpResultObject>;
}

export interface DbCollection<TSchema> extends CustomDbCollection<TSchema> {
  aggregate<T>(
    pipeline?: object[],
    options?: CollectionAggregationOptions
  ): Promise<T[]>;
  insertOne(
    docs: OptionalId<TSchema>,
    options?: CollectionInsertOneOptions
  ): Promise<InsertOneWriteOpResult<WithId<TSchema>>>;
  insertMany(
    docs: Array<OptionalId<TSchema>>,
    options?: CollectionInsertManyOptions
  ): Promise<InsertWriteOpResult<WithId<TSchema>>>;
  countDocuments(
    query?: FilterQuery<TSchema>,
    options?: MongoCountPreferences
  ): Promise<number>;
  find<T = TSchema>(
    query: FilterQuery<TSchema>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<Cursor<T>>;
  findOne<T = TSchema>(
    filter: FilterQuery<TSchema>,
    options?: FindOneOptions<T extends TSchema ? TSchema : T>
  ): Promise<T | null>;
  findOneAndDelete(
    filter: FilterQuery<TSchema>,
    options?: FindOneAndDeleteOption<TSchema>
  ): Promise<FindAndModifyWriteOpResultObject<TSchema>>;
  findOneAndReplace(
    filter: FilterQuery<TSchema>,
    replacement: object,
    options?: FindOneAndReplaceOption<TSchema>
  ): Promise<FindAndModifyWriteOpResultObject<TSchema>>;
  findOneAndUpdate(
    filter: FilterQuery<TSchema>,
    update: UpdateQuery<TSchema> | TSchema,
    options?: FindOneAndUpdateOption<TSchema>
  ): Promise<FindAndModifyWriteOpResultObject<TSchema>>;
  deleteMany(
    filter: FilterQuery<TSchema>,
    options?: CommonOptions
  ): Promise<DeleteWriteOpResultObject>;
  deleteOne(
    filter: FilterQuery<TSchema>,
    options?: CommonOptions
  ): Promise<DeleteWriteOpResultObject>;
  update(
    model: TSchema,
    fields: Array<keyof TSchema>,
    options?: CommonOptions
  ): Promise<void>;
}

export function createCollection<T>(
  collectionName: string,
  indexes?: IndexSpecification[]
): DbCollection<T> {
  const _getDb = () => {
    const client = getClient();
    return client.db(
      process.env.JEST_WORKER_ID
        ? `jest-${config.mongodb.dbName}-${process.env.JEST_WORKER_ID}`
        : config.mongodb.dbName
    );
  };
  const _getCollection = () => {
    return _getDb().collection<T>(collectionName);
  };

  const exec = async (
    name: Exclude<keyof DbCollection<any>, keyof CustomDbCollection<any>>,
    n: 2 | 3,
    args: any[]
  ) => {
    if (n === 2) {
      if (!args[1]) {
        args[1] = {};
      }
    } else {
      if (!args[2]) {
        args[2] = {};
      }
    }
    args[args.length - 1]!.session = await dbSessionStorage.getStore();
    const collection = _getCollection();
    const fn: any = collection[name].bind(collection);
    return fn(...args);
  };

  const ret: DbCollection<T> = {
    async aggregate(...args) {
      return (await exec('aggregate', 2, args)).toArray();
    },
    insertOne(...args) {
      return exec('insertOne', 2, args);
    },
    insertMany(...args) {
      return exec('insertMany', 2, args);
    },
    countDocuments(...args) {
      return exec('countDocuments', 2, args);
    },
    find(...args) {
      return exec('find', 2, args);
    },
    async findAll(...args) {
      return (await this.find(...args)).toArray();
    },
    findOne(...args) {
      return exec('findOne', 2, args);
    },
    findById(id, options) {
      return this.findOne(
        {
          _id: id,
        } as any,
        options
      );
    },
    findByIdOrThrow(id, options) {
      return this.findOneOrThrow(
        {
          _id: id,
        } as any,
        options
      );
    },
    async findOneOrThrow(...args) {
      const ret = await exec('findOne', 2, args);
      if (!ret) {
        throw new Error(
          `Entity ${JSON.stringify(args[0])} not found in ${collectionName}`
        );
      }
      return ret;
    },
    findOneAndDelete(...args) {
      return exec('findOneAndDelete', 2, args);
    },
    findOneAndReplace(...args) {
      return exec('findOneAndReplace', 3, args);
    },
    findOneAndUpdate(...args) {
      return exec('findOneAndUpdate', 3, args);
    },
    deleteMany(...args) {
      return exec('deleteMany', 2, args);
    },
    deleteOne(...args) {
      return exec('deleteOne', 2, args);
    },
    deleteById(id, options) {
      return this.deleteOne(
        {
          _id: id as any,
        },
        options
      );
    },
    async update(model: any, fields, options) {
      if (model._id == null) {
        throw new Error('_id not defined');
      }
      await this.findOneAndUpdate(
        {
          _id: model._id,
        },
        {
          $set: R.pick(model, fields),
        },
        options
      );
    },
  };

  (ret as any).initIndex = () => {
    if (!indexes || indexes.length === 0) {
      return;
    }
    return _getCollection().createIndexes(indexes);
  };
  (ret as any).createCollection = () => {
    return _getDb()
      .createCollection(collectionName)
      .catch(() => {
        // ignore
      });
  };

  return ret;
}

export function getAllCollection(): Array<DbCollection<any>> {
  return R.pipe(
    fs.readdirSync(Path.join(__dirname, './collections')),
    R.map(name => Object.values(require('./collections/' + name))),
    R.flatten
  ) as any;
}

export function createCollections() {
  return Promise.all(
    getAllCollection().map(async (collection: any) => {
      await collection.createCollection();
      await collection.initIndex();
    })
  );
}

export function createFlagTransaction(uniqueId: string) {
  const FlagCollection = require('./collections/Flag')
    .FlagCollection as DbCollection<any>;
  return async (stepName: string, fn: () => Promise<void>) => {
    await withTransaction(async () => {
      const flagId = `${uniqueId}:${stepName}`;
      const existing = await FlagCollection.findById(flagId);
      if (existing) {
        return;
      }
      await fn();
      await FlagCollection.insertOne({ _id: flagId });
    });
  };
}
