import { GetServerSideProps } from 'next';
import { createSSRClient, wrapDisabled } from 'src/common/helper';
import { ModulesPage } from 'src/features/modules/ModulesPage';

export default ModulesPage;

export const getServerSideProps: GetServerSideProps = wrapDisabled(
  async ctx => {
    const api = createSSRClient(ctx);
    return {
      props: {
        modules: await api.module_getAllModules(),
      },
    };
  }
);
