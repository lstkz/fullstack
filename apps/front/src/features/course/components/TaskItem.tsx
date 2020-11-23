import * as React from 'react';
import { Badge } from 'src/new-components/Badge';
import { Button } from 'src/new-components/Button';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface TaskItemProps {
  className?: string;
  aboveText: React.ReactNode;
  title: React.ReactNode;
}

const AboveText = styled.div`
  font-size: 0.8rem;
`;

const LessonCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const TitleStack = styled.div`
  ${spacerStyle}
`;

const RightCol = styled(LessonCol)`
  justify-content: flex-end;
  align-items: center;
`;

const _TaskItem = (props: TaskItemProps) => {
  const { className, title, aboveText } = props;
  return (
    <a href="#" className={className}>
      <Row>
        <LessonCol md={8}>
          <Badge dot type="secondary" />
          <TitleStack ml={3}>
            <AboveText>{aboveText}</AboveText>
            <Heading type={6}>{title}</Heading>
          </TitleStack>
        </LessonCol>
        <RightCol md={4}>
          <Button size="small" type="secondary">
            Rozwiąż
          </Button>
        </RightCol>
      </Row>
    </a>
  );
};

export const TaskItem = styled(_TaskItem)`
  display: block;
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #eaecf3;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  color: ${NewTheme.gray_600};
`;
