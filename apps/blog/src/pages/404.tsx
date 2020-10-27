import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MainToColGrid } from '../components/MainToColGrid';

interface NotFoundPageProps {
  location: any;
}

const NotFoundPage = ({ location }: NotFoundPageProps) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
      <MainToColGrid white>
        <h1>404: Not Found</h1>
        <p>Strona nie istnieje...</p>
      </MainToColGrid>
    </Layout>
  );
};

export default NotFoundPage;
