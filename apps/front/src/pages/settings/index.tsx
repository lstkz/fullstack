import { GetServerSideProps } from 'next';
import { createSSRClient, wrapDisabled } from 'src/common/helper';
import { SettingsPage } from 'src/features/settings/SettingsPage';

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = wrapDisabled(
  async ctx => {
    const api = createSSRClient(ctx);
    return {
      props: {
        info: await api.user_getGeneralInfo(),
      },
    };
  }
);
