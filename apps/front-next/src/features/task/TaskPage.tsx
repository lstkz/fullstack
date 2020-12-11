import React from 'react';
import { ModuleTaskDetails } from 'shared';
import { Loader } from 'src/components/Loader';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { TaskHeader } from './TaskHeader';

interface TaskPageProps {
  task: ModuleTaskDetails;
}

if (typeof window !== 'undefined') {
  window.React = React;
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  min-width: 1000px;
  height: 100%;
`;

const Left = styled.div`
  width: 400px;
  background: white;
  padding: 1rem;
  height: 100%;
  h1 {
    color: ${Theme.headings_color};
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
    margin-bottom: 0.25rem;
  }
`;
const Right = styled.div`
  flex: 1 0 auto;
  height: 100%;
`;

export function TaskPage(props: TaskPageProps) {
  const { task } = props;
  const [details, setDetails] = React.useState<React.FunctionComponent | null>(
    null
  );
  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = task.detailsUrl;
    (window as any).TaskJSONP = (module: any) => {
      setDetails(module.Details);
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const renderDetails = () => {
    if (!details) {
      return <Loader />;
    }
    return (
      <Main className="">
        <Left>{details}</Left>
        <Right>
          <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://test-vm.styx-dev.com/?folder=/home/ubuntu/task1"
          />
          {/* <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="http://test-vm.styx-dev.com:8080/?folder=/home/ubuntu/task1"
          /> */}
        </Right>
      </Main>
    );
  };

  return (
    <Wrapper>
      <TaskHeader />
      {renderDetails()}
    </Wrapper>
  );
}
