import React from 'react';
import { Container } from 'src/new-components/Container';
import { Dashboard } from 'src/new-components/Dashboard';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { useCourseModule } from '../module';
import { LessonsSection } from './LessonsSection';
import { TasksSection } from './TasksSection';
import { WeekInfo } from './WeekInfo';

export function CourseView() {
  useCourseModule();

  return (
    <Dashboard>
      <Container>
        <Heading type={3} my={4}>
          Typescript i algorytmika od podstaw
        </Heading>
        <WeekInfo my={4} />
        <Row>
          <Col md={6}>
            <LessonsSection />
          </Col>
          <Col md={6}>
            <TasksSection />
          </Col>
        </Row>
      </Container>
    </Dashboard>
  );
}
