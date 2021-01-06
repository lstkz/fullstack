import { GetServerSideProps } from 'next';
import { createSSRClient, wrapDisabled } from 'src/common/helper';
import { SubscriptionPage } from 'src/features/settings/SubscriptionPage';

export default SubscriptionPage;

export const getServerSideProps: GetServerSideProps = wrapDisabled(
  async ctx => {
    const api = createSSRClient(ctx);
    const [subscriptionStatus, orders] = await Promise.all([
      api.subscription_getSubscriptionStatus(),
      api.subscription_getOrders(),
    ]);
    return {
      props: { subscriptionStatus, orders },
    };
  }
);
