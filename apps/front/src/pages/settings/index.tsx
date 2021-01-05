import { GetServerSideProps } from 'next';
import { wrapDisabled } from 'src/common/helper';
import { SettingsPage } from 'src/features/settings/SettingsPage';

export default SettingsPage;

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
