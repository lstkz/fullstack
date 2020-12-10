import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { ModulePage } from 'src/features/module/ModulePage';

export default ModulePage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const api = createSSRClient(ctx);
  return {
    props: {
      module: await api.module_getModule(ctx.query.id as string),
    },
  };
};
