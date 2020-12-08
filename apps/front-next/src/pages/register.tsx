import { GetServerSideProps } from 'next';
import { readCookieFromString } from 'src/common/cookie';
import { RegisterView } from 'src/features/register/RegisterView';

export default RegisterView;

export const getServerSideProps: GetServerSideProps = async context => {
  if (readCookieFromString(context.req.headers['cookie'], 'token')) {
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
