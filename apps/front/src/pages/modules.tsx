import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { ModulesPage } from 'src/features/modules/ModulesPage';

export default ModulesPage;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  return {
    props: {
      modules: await api.module_getAllModules(),
    },
  };
});
