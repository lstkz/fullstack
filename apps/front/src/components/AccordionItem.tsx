import * as React from 'react';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { Heading } from './Heading';
import { spacerStyle } from './_spacer';

interface AccordionItemProps {
  className?: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

interface AccordionItemAPI {
  setIsExpanded(isExpanded: boolean): void;
}

const AccordionContext = React.createContext<{
  register: (itemAPI: AccordionItemAPI) => void;
  unregister: (itemAPI: AccordionItemAPI) => void;
  collapseOthers: (itemAPI: AccordionItemAPI) => void;
}>(null!);

interface AccordionProps {
  children: React.ReactNode;
}

export function Accordion(props: AccordionProps) {
  const { children } = props;
  const itemsRef = React.useRef<AccordionItemAPI[]>([]);
  const context = React.useMemo(() => {
    return {
      register: (itemAPI: AccordionItemAPI) => {
        itemsRef.current.push(itemAPI);
      },
      unregister: (itemAPI: AccordionItemAPI) => {
        itemsRef.current.splice(itemsRef.current.indexOf(itemAPI));
      },
      collapseOthers: (itemAPI: AccordionItemAPI) => {
        itemsRef.current.forEach(otherAPI => {
          if (otherAPI !== itemAPI) {
            otherAPI.setIsExpanded(false);
          }
        });
      },
    };
  }, []);
  return (
    <AccordionContext.Provider value={context}>
      {children}
    </AccordionContext.Provider>
  );
}

const Header = styled.div`
  padding: 1.5rem 1.75rem;
  svg {
    margin-right: 1rem;
  }
  position: relative;
  cursor: pointer;
  :after {
    content: '+';
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 700;
    color: ${Theme.gray_600};
  }
  &[aria-expanded='true']:after {
    content: '-';
  }
  ${spacerStyle};
`;
const Content = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.75rem;
  padding-top: 0;
  color: ${Theme.gray_600};
  overflow: hidden;
`;

const AnimateHeight = styled.div`
  overflow: hidden;
  transition: height ease-in 200ms;
`;

const _AccordionItem = (props: AccordionItemProps) => {
  const { className, header, children } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null!);
  const context = React.useContext(AccordionContext);
  const api = React.useMemo<AccordionItemAPI>(() => {
    return {
      setIsExpanded,
    };
  }, []);
  React.useEffect(() => {
    const api: AccordionItemAPI = {
      setIsExpanded,
    };
    context.register(api);
    return () => {
      context.unregister(api);
    };
  }, []);
  return (
    <div className={className}>
      <Header
        aria-expanded={isExpanded}
        role="button"
        onClick={() => {
          if (!isExpanded) {
            context.collapseOthers(api);
          }
          setIsExpanded(!isExpanded);
          setContentHeight(contentRef.current.clientHeight);
        }}
      >
        <Heading type={6}>{header}</Heading>
      </Header>
      <AnimateHeight style={{ height: isExpanded ? contentHeight : 0 }}>
        <Content
          ref={(node: any) => {
            if (node) {
              contentRef.current = node;
              setContentHeight(node.clientHeight);
            }
          }}
        >
          {children}
        </Content>
      </AnimateHeight>
    </div>
  );
};

export const AccordionItem = styled(_AccordionItem)`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background-color: #fff;
  margin-bottom: 1.5rem;
  ${spacerStyle};
`;
