import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MainToColGrid } from '../components/MainToColGrid';
import styled from 'styled-components';
import { Title } from '../components/Title';

interface NotFoundPageProps {
  location: any;
}

const Content = styled.div``;

const Contact = ({ location }: NotFoundPageProps) => {
  return (
    <Layout location={location}>
      <SEO title="Kontakt" />
      <MainToColGrid white>
        <Title>Kontakt</Title>
        <Content>
          Masz pytania? Napisz na{' '}
          <a href="mailto:lukasz@sentkiewicz.pl">lukasz@sentkiewicz.pl</a>.
        </Content>
      </MainToColGrid>
    </Layout>
  );
};

export default Contact;
