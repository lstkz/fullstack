import * as React from 'react';
import styled, { css } from 'styled-components';
import { SolvedTag } from './SolvedTag';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { Button } from './Button';
import { Theme, MOBILE } from 'src/Theme';

interface MediaCardProps {
  testId: string;
  className?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  button: React.ReactNode;
  disabled?: boolean;
  highlighted?: boolean;
}

const Top = styled.div`
  display: flex;
  align-items: center;
  ${SolvedTag} {
    margin-right: 10px;
  }
`;

const Col2 = styled.div`
  flex-grow: 1;
  padding-right: 30px;
`;

const Col3 = styled.div`
  width: 190px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  ${Button} {
    margin-left: auto;
    margin-right: 0;
  }
`;

const Desc = styled.div`
  margin-top: 10px;
`;

const MobileRow1 = styled.div`
  display: flex;
  svg {
    margin-right: 20px;
  }
`;
const MobileRow2 = styled.div``;
const MobileRow3 = styled.div`
  display: flex;
  margin-top: 10px;
  ${Button} {
    margin-left: auto;
    margin-right: 0;
  }
`;

const _MediaCard = (props: MediaCardProps) => {
  const { className, testId, title, description, button } = props;
  const isMobile = useIsMobile();

  return (
    <div className={className} data-test={testId}>
      {isMobile ? (
        <>
          <MobileRow1>
            <Top>{title}</Top>
          </MobileRow1>
          <MobileRow2>
            <Desc data-test="desc">{description}</Desc>
          </MobileRow2>
          <MobileRow3>{button}</MobileRow3>
        </>
      ) : (
        <>
          <Col2>
            <Top>{title}</Top>
            <Desc data-test="desc">{description}</Desc>
          </Col2>
          <Col3>{button}</Col3>
        </>
      )}
    </div>
  );
};

export const MediaCard = styled(_MediaCard)`
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${Theme.grayLight};
  display: flex;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 20px 20px 25px 25px;
  position: relative;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
  ${props =>
    props.highlighted &&
    css`
      border: 1px solid ${Theme.blueTag};
      background: ${Theme.lightBlue};
    `}

  ${MOBILE} {
    flex-direction: column;
  }
`;
