import { GetServerSideProps } from 'next';
import { wrapDisabled } from 'src/common/helper';
import { SubscriptionPage } from 'src/features/settings/SubscriptionPage';

export default SubscriptionPage;

export const getServerSideProps: GetServerSideProps = wrapDisabled(
  async ctx => {
    // const api = createSSRClient(ctx);
    return {
      props: {
        // modules: await api.module_getAllModules(),
      },
    };
  }
);
