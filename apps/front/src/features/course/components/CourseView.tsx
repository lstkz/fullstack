import React from 'react';
import { Container } from 'src/components/Container';
import { Badge } from 'src/components/Badge';
import { Dashboard } from 'src/components/Dashboard';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { Tab, Tabs } from 'src/components/Tabs';
import { spacerStyle } from 'src/components/_spacer';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { useCourseModule } from '../module';
import { LessonsSection } from './LessonsSection';

const Content = styled.div`
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.75rem;
  ${spacerStyle}
`;

const Header = styled.div`
  ${spacerStyle}
`;

export function CourseView() {
  useCourseModule();

  return (
    <Dashboard>
      <Container>
        <Content my={5}>
          <Header py={4} px={4}>
            <Row>
              <Col md={10}>
                <Heading type={3}>Typescript i algorytmika od podstaw</Heading>
              </Col>
              <Col md={2}>
                <Badge type="success">Ukończono 25%</Badge>
              </Col>
            </Row>
          </Header>
          <Tabs
            selectedTab="lessons"
            onIndexChange={() => {
              //
            }}
          >
            <Tab name="lessons" title="Lekcje">
              <LessonsSection />
            </Tab>
            <Tab name="tasks" title="Zadania">
              zadania content
            </Tab>
          </Tabs>
        </Content>
      </Container>
    </Dashboard>
  );
}
