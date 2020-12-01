import { connect } from '../src/db';
import * as Collections from '../src/collections';

export function createCollections() {
  return Promise.all(
    Object.values(Collections).map(async (collection: any) => {
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
    Object.values(Collections).map(collection => collection.deleteMany({}))
  );
}
