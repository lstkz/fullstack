import React from 'react';
import * as PopperJS from 'popper.js';
import { Manager, Reference, Popper } from 'react-popper';

interface MenuDropdownProps {
  children: React.ReactElement;
  dropdown: React.ReactNode;
  placement?: PopperJS.Placement;
  testId?: string;
}

function isClickable(node: HTMLElement | null): boolean {
  if (!node) {
    return false;
  }
  if (node.tagName === 'A' || node.tagName === 'BUTTON') {
    return true;
  }
  return isClickable(node.parentElement);
}

export function MenuDropdown(props: MenuDropdownProps) {
  const { children, dropdown, placement, testId } = props;
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onClick = () => {
      if (isOpen) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  return (
    <Manager>
      <Reference>
        {({ ref }) =>
          React.cloneElement(children, {
            'data-dropdown-toggle': true,
            'data-test': testId,
            ref: ref,
            onClick: (e: MouseEvent) => {
              e.stopPropagation();
              setOpen(!isOpen);
            },
          })
        }
      </Reference>
      <Popper
        modifiers={{
          preventOverflow: {
            enabled: true,
            boundariesElement:
              typeof document === 'undefined' ? undefined : document.body,
          },
        }}
        placement={placement || 'bottom-start'}
      >
        {({ ref, style, placement: _placement }) =>
          isOpen && (
            <div
              ref={ref}
              style={{ ...style, zIndex: 2 }}
              data-placement={_placement}
              onClick={e => {
                if (isClickable(e.target as any)) {
                  return;
                }
                e.nativeEvent.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              {dropdown}
            </div>
          )
        }
      </Popper>
    </Manager>
  );
}
