import classNames from 'classnames';
import * as React from 'react';
import { Heading } from './Heading';

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

export function AccordionItem(props: AccordionItemProps) {
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
    <div
      className={classNames(
        'flex flex-col rounded-xl bg-white mb-6',
        className
      )}
    >
      <div
        className="py-6 px-7 relative cursor-pointer"
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
        <div className="absolute right-6 top-1/2 text-gray-600 font-bold transform -translate-y-1/2">
          {isExpanded ? '-' : '+'}
        </div>
      </div>
      <div
        className="overflow-hidden transition-all"
        style={{ height: isExpanded ? contentHeight : 0 }}
      >
        <div
          className="p-7 pt-0 flex-auto overflow-hidden text-gray-600"
          ref={(node: any) => {
            if (node) {
              contentRef.current = node;
              setContentHeight(node.clientHeight);
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
