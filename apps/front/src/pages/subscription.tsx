import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { SubscriptionPage } from 'src/features/subscription/SubscriptionPage';

export default SubscriptionPage;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  const [subscriptionPlans, info] = await Promise.all([
    api.subscriptionPlan_getAllSubscriptionPlans(),
    api.user_getGeneralInfo(),
  ]);
  return {
    props: { subscriptionPlans, info },
  };
});
