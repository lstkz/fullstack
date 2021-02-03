import { GetServerSideProps } from 'next';
import { createSSRClient } from 'src/common/helper';
import { LandingView } from 'src/features/landing/LandingView';

export default LandingView;

export const getServerSideProps: GetServerSideProps = async context => {
  const client = createSSRClient(context);
  if (client.getToken()) {
    return {
      redirect: {
        destination: '/modules',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
