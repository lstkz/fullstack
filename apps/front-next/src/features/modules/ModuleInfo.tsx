import {
  faCode,
  faGraduationCap,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { createUrl } from 'src/common/url';
import { TsIcon } from 'src/icons/TsIcon';
import { Button } from 'src/components/Button';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { ProgressBar } from 'src/components/ProgressBar';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { Module } from 'shared';
import Link from 'next/link';

interface ModuleInfoProps {
  className?: string;
  module: Module;
}

interface WrapperProps {}

const Stat = styled.div`
  margin: 0 0.5rem;
`;

const Wrapper = styled<WrapperProps, 'div'>('div')`
  display: block;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.75rem;
  padding: 1.75rem 1.75rem 0;
  color: ${Theme.gray_600};
`;

const Footer = styled.div`
  padding: 1rem 0;
  position: relative;
  margin-top: 1rem;
  font-size: 0.75rem;
  font-weight: 300;
  color: ${Theme.gray_600};

  svg {
    color: ${Theme.primary};
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

export const ModuleInfo = (props: ModuleInfoProps) => {
  const { module } = props;
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
                name: 'module',
                id: module.id,
              })}
              data-test="title"
            >
              <Heading type={5}>{module.name}</Heading>
            </Link>
          </Title>
          <div>{module.description}</div>
        </Col1>
        <ButtonCol md={2}>
          <Button
            testId="show-btn"
            type="secondary"
            href={createUrl({ name: 'module', id: module.id })}
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
