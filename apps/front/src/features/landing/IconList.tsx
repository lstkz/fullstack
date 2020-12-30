import { ReactNode } from 'react';

interface IconListItemProps {
  children: ReactNode;
  icon: ReactNode;
}

export function IconListItem(props: IconListItemProps) {
  const { children, icon } = props;
  return (
    <li className="text-heading flex items-center font-semibold py-2">
      {icon}
      <span className="ml-4">{children}</span>
    </li>
  );
}

interface IconListProps {
  children: ReactNode;
}

export function IconList(props: IconListProps) {
  const { children } = props;
  return <ul>{children}</ul>;
}
