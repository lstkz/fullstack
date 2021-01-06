import { GetServerSideProps } from 'next';
import { createSSRClient, wrapDisabled } from 'src/common/helper';
import { NotificationsPage } from 'src/features/settings/NotificationsPage';

export default NotificationsPage;

export const getServerSideProps: GetServerSideProps = wrapDisabled(
  async ctx => {
    const api = createSSRClient(ctx);
    return {
      props: {
        settings: await api.user_getNotificationSettings(),
      },
    };
  }
);
