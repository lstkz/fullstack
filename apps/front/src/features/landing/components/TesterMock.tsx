import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import * as R from 'remeda';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button } from 'src/new-components/Button';
import { Heading } from 'src/new-components/Heading';
import { SpinnerBoarder } from 'src/new-components/SpinnerBoarder';
import { NewTheme } from 'src/NewTheme';
import styled, { css } from 'styled-components';

interface TesterMockProps {
  className?: string;
}

const SubHeading = styled.div`
  font-size: 0.8rem;
  color: ${NewTheme.gray_100};
`;

const Title = styled.div`
  color: white;
`;

const Top = styled.div`
  padding: 0.5rem;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Item = styled.div<{ idx: number; color: 'success' | 'danger' }>`
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  ${props =>
    props.color === 'success'
      ? css`
          color: white;
          background: ${NewTheme.success};
        `
      : css`
          color: white;
          background: ${NewTheme.danger};
        `}
  .beforeAnim & {
    transition: none;
    transform: scale(0);
    opacity: 0;
  }
  transform: scale(1);
  opacity: 1;
  transition: all 0.35s cubic-bezier(0.36, -0.64, 0.34, 1.76)
    ${props => props.idx * 350}ms;
`;

const Bar = styled.div`
  flex: 1 0 auto;
  height: 0.75rem;
  border-radius: 0.375rem;
  background: currentColor;
  margin-left: 0.5rem;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1 0 auto;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

const _TesterMock = (props: TesterMockProps) => {
  const { className } = props;
  const contentRef = React.useRef<HTMLDivElement>(null!);
  const [items, setItems] = React.useState<Array<'success' | 'danger'>>([
    'success',
    'danger',
    'danger',
    'danger',
    'success',
    'success',
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const loadTimeout = React.useRef<any>(null!);
  const animate = () => {
    clearTimeout(loadTimeout.current);
    setIsLoading(true);
    contentRef.current.classList.add('beforeAnim');
    loadTimeout.current = setTimeout(() => {
      setIsLoading(false);
      setItems(
        R.range(0, 6).map(() => (Math.random() < 0.33 ? 'danger' : 'success'))
      );
      setTimeout(() => {
        contentRef.current.classList.remove('beforeAnim');
      }, 50);
    }, 500);
  };

  React.useLayoutEffect(() => {
    animate();
    return () => {
      clearTimeout(loadTimeout.current);
    };
  }, []);
  1;
  return (
    <div className={className}>
      <Top>
        <Title>
          <SubHeading>Zadanie 2</SubHeading>
          <Heading m={0} type={6} white>
            Cykliczna tablica
          </Heading>
        </Title>
        <Button
          loading={isLoading}
          size="extra-small"
          type="neutral"
          onClick={animate}
        >
          Testuj
        </Button>
      </Top>
      <Content ref={contentRef as any}>
        {isLoading ? (
          <LoaderWrapper>
            <SpinnerBoarder />
          </LoaderWrapper>
        ) : (
          items.map((color, i) => (
            <Item color={color} idx={i}>
              <FontAwesomeIcon
                icon={color === 'danger' ? faTimesCircle : faCheckCircle}
              />
              <Bar />
            </Item>
          ))
        )}
      </Content>
    </div>
  );
};

export const TesterMock = styled(_TesterMock)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
