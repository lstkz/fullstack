import { SubscriptionPlanCollection } from './collections/SubscriptionPlan';
import { connect, disconnect } from './db';

async function start() {
  if (process.env.CONFIG_NAME === 'prod') {
    throw new Error('Cannot run in production');
  }
  await connect();
  await SubscriptionPlanCollection.deleteMany({});
  await SubscriptionPlanCollection.insertMany([
    {
      _id: 'monthly',
      type: 'monthly',
      name: 'Miesięczny plan',
      price: {
        net: 161.79,
        vat: 37.21,
        total: 199,
        vatRate: 23,
      },
      pricePerMonth: 199,
      savings: 0,
    },
    {
      _id: 'annual',
      type: 'annual',
      name: 'Roczny plan',
      price: {
        net: 1258.54,
        vat: 289.46,
        total: 1548,
        vatRate: 23,
      },
      pricePerMonth: 129,
      savings: 840,
    },
  ]);
}

start()
  .then(disconnect)
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
