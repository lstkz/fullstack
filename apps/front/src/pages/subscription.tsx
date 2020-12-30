import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { SubscriptionPage } from 'src/features/subscription/SubscriptionPage';

export default SubscriptionPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  ctx.req;
  const api = createSSRClient(ctx);
  return {
    props: {
      subscriptionPlans: await api.subscriptionPlan_getAllSubscriptionPlans(),
    },
  };
};
