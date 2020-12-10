import { ModuleDetails } from 'shared';
import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';
import { ModuleSummary } from './ModuleSummary';
import { Col, Row } from 'src/components/Grid';
import { LessonsSection } from './LessonsSection';
import { TasksSection } from './TasksSection';

interface ModulePageProps {
  module: ModuleDetails;
}

export function ModulePage(props: ModulePageProps) {
  const { module } = props;
  return (
    <Dashboard>
      <Container data-test="module-page" mt>
        <Heading type={3} my={4}>
          {module.name}
        </Heading>
        <ModuleSummary my={4} />
        <Row>
          <Col md={6}>
            <LessonsSection module={module} />
          </Col>
          <Col md={6}>
            <TasksSection module={module} />
          </Col>
        </Row>
      </Container>
    </Dashboard>
  );
}
