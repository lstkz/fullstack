import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Course } from 'shared';
import { createUrl } from 'src/common/url';
import { Link } from 'src/components/Link';
import { TsIcon } from 'src/icons/TsIcon';
import { Button } from 'src/new-components/Button';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { ProgressBar } from 'src/new-components/ProgressBar';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface CourseInfoProps {
  className?: string;
  course: Course;
}

interface WrapperProps {}

const Stat = styled.div`
  margin: 0 0.5rem;
`;

const Wrapper = styled<WrapperProps, 'div'>('div')`
  display: block;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${NewTheme.gray_200};
  border-radius: 0.75rem;
  padding: 1.75rem 1.75rem 0;
  color: ${NewTheme.gray_600};
`;

const Footer = styled.div`
  padding: 1rem 0;
  position: relative;
  margin-top: 1rem;
  font-size: 0.75rem;
  font-weight: 300;
  color: ${NewTheme.gray_600};

  svg {
    color: ${NewTheme.primary};
  }
  &:before {
    content: '';
    display: block;
    width: 80%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -40%;
    height: 1px;
    background: radial-gradient(
      ellipse at center,
      #d1dbe7 0,
      rgba(255, 255, 255, 0) 75%
    );
  }
`;

const StatsCol = styled(Col)`
  display: flex;
  align-items: flex-end;
`;

const Col1 = styled(Col)``;

const ButtonCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Icon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CourseInfo = (props: CourseInfoProps) => {
  const { course } = props;
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    let nextTick = 1;
    const id = setInterval(() => {
      setTick(nextTick++);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Wrapper>
      <Row>
        <Col1 md={10}>
          <Title>
            <Icon>
              <TsIcon />
            </Icon>
            <Link
              href={createUrl({
                name: 'course',
                id: course.id,
              })}
              testId="title"
            >
              <Heading type={5}>{course.name}</Heading>
            </Link>
          </Title>
          <div>{course.description}</div>
        </Col1>
        <ButtonCol md={2}>
          <Button
            testId="show-btn"
            type="secondary"
            href={createUrl({ name: 'course', id: course.id })}
          >
            Pokaż
          </Button>
        </ButtonCol>
      </Row>
      <Footer>
        <Row>
          <StatsCol md={6}>
            <Stat>
              <FontAwesomeIcon icon={faGraduationCap} /> 20 lekcji
            </Stat>
            <Stat>
              <FontAwesomeIcon icon={faCode} /> 30 zadań
            </Stat>
            <Stat>
              <FontAwesomeIcon icon={faHourglassHalf} /> 20 godzin praktyki
            </Stat>
          </StatsCol>
          <Col md={6}>
            <ProgressBar title="Postęp" progress={25} />
          </Col>
        </Row>
      </Footer>
    </Wrapper>
  );
};
