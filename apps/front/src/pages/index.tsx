import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { LandingView } from 'src/features/landing/LandingView';

export default LandingView;

export const getServerSideProps: GetServerSideProps = async context => {
  const client = createSSRClient(context);
  if (client.getToken()) {
    const query = (context.req.url ?? '').split('?')[1];
    return {
      redirect: {
        destination: '/modules' + (query ? `?${query}` : ''),
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
