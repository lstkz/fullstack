import * as React from 'react';
import { Theme } from 'src/Theme';
import styled, { css } from 'styled-components';
import { VoidLink } from './VoidLink';

interface TabsProps {
  className?: string;
  children:
    | React.ReactElement<TabProps>
    | Array<React.ReactElement<TabProps> | false | null | undefined>;
  selectedTab: any;
  onIndexChange: (index: any) => any;
  flex?: boolean;
}

interface TabProps {
  title: string;
  name?: string;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
  testId?: string;
}

function _Tabs(props: TabsProps) {
  const { className, children, onIndexChange, selectedTab } = props;
  const tabs = (Array.isArray(children)
    ? children.filter(x => x)
    : [children]) as Array<React.ReactElement<TabProps>>;
  const selected = React.useMemo(
    () =>
      tabs.find(
        (item, i) => item.props.name === selectedTab || i === selectedTab
      ),
    [tabs, selectedTab]
  );
  return (
    <div className={className}>
      <ul>
        {tabs.map((item, i) => {
          const { name, testId, title } = item.props;
          return (
            <TabTitle
              data-test={testId}
              key={name || i}
              active={i === selectedTab || name === selectedTab}
              onClick={() => onIndexChange(name || i)}
            >
              <VoidLink>{title}</VoidLink>
            </TabTitle>
          );
        })}
      </ul>
      {selected}
    </div>
  );
}

export const Tab = styled((props: TabProps) => (
  <div className={props.className}>{props.children}</div>
))``;

const TabTitle = styled.li<{ active: boolean }>`
  &:first-child {
    margin-left: 0;
  }
  .VoidLink {
    border-radius: 0.375rem;
    color: ${Theme.gray_700};
    font-size: 0.875rem;
    display: block;
    padding: 0.25rem 3rem;

    ${props =>
      props.active &&
      css`
        font-weight: 600;
        color: #fff;
        background-color: ${Theme.primary};
      `}
  }
`;

export const Tabs = styled(_Tabs)`
  > ul {
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${Theme.gray_300};
  }

  ${props =>
    props.flex &&
    css`
      display: flex;
      flex-direction: column;
      ${Tab} {
        flex: 1 0 auto;
      }
    `}
`;
