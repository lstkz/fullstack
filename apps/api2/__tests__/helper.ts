import { connect, getAllCollection } from '../src/db';

export function createCollections() {
  return Promise.all(
    getAllCollection().map(async (collection: any) => {
      await collection.createCollection();
      await collection.initIndex();
    })
  );
}

export async function initDb() {
  await connect();

  await createCollections();
}

export async function resetDb() {
  await Promise.all(
    getAllCollection().map(collection => collection.deleteMany({}))
  );
}
