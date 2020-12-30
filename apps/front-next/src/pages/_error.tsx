import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { clearAccessToken } from 'src/services/Storage';

function ErrorPage({ statusCode }: { statusCode: number }) {
  const router = useRouter();

  React.useEffect(() => {
    if (statusCode === 403 || statusCode === 401) {
      clearAccessToken();
      void router.push('/login');
    }
  }, []);

  return (
    <Dashboard>
      <div className="text-center text-heading text-xl mt-10">
        Wystąpił bład...
      </div>
    </Dashboard>
  );
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
