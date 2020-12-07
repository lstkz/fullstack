import { GetServerSideProps } from 'next';
import { readCookieFromString } from 'src/common/cookie';
import { LoginView } from 'src/features/login/LoginView';

export default LoginView;

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
