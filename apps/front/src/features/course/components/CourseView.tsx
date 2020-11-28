import React from 'react';
import { Container } from 'src/new-components/Container';
import { Badge } from 'src/new-components/Badge';
import { Dashboard } from 'src/new-components/Dashboard';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { Tab, Tabs } from 'src/new-components/Tabs';
import { spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { useCourseModule } from '../module';
import { LessonsSection } from './LessonsSection';

const Content = styled.div`
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${NewTheme.gray_200};
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
