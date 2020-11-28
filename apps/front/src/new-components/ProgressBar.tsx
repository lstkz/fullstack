import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface ProgressBarProps {
  className?: string;
  title?: React.ReactNode;
  progress: number;
}

const Title = styled.div`
  color: ${NewTheme.gray_600};
  font-size: 0.675rem;
  font-weight: 400;
  text-transform: uppercase;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
`;

const ProgressBg = styled.div`
  display: flex;
  height: 0.375rem;
  overflow: hidden;
  line-height: 0;
  font-size: 0.75rem;
  background-color: ${NewTheme.gray_200};
  border-radius: 50rem;
  flex: 1 0 auto;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: ${NewTheme.primary};
  transition: width 0.6s ease;
`;

const Value = styled.div`
  text-align: right;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${NewTheme.primary};
  display: flex;
  margin-left: 1rem;
`;

const _ProgressBar = (props: ProgressBarProps) => {
  const { className, progress, title } = props;
  return (
    <div className={className}>
      <Title>{title}</Title>
      <ProgressWrapper>
        <ProgressBg>
          <Progress
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + '%' }}
          />
        </ProgressBg>
        <Value>{progress}%</Value>
      </ProgressWrapper>
    </div>
  );
};

export const ProgressBar = styled(_ProgressBar)`
  display: block;
`;
