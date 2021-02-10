import classNames from 'classnames';
import * as React from 'react';
import { cx, isConfirmKey } from 'src/common/helper';
import { InputFeedback } from './Input';

export interface CheckboxProps {
  className?: string;
  children?: React.ReactNode;
  id: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  feedback?: string;
  state?: 'error';
  testId?: string;
}

export function Checkbox(props: CheckboxProps) {
  const {
    className,
    id,
    isChecked,
    children,
    onChange,
    feedback,
    state,
    testId,
  } = props;

  return (
    <div className={cx('mb-4', className)} data-test={testId}>
      <div
        id={id}
        tabIndex={0}
        className={cx('flex items-center cursor-pointer focus:outline-none')}
        role="checkbox"
        aria-checked={isChecked}
        onClick={() => {
          onChange(!isChecked);
        }}
        data-test={testId}
        onKeyPress={e => {
          if (isConfirmKey(e.key || e.nativeEvent.key)) {
            e.preventDefault();
            onChange(!isChecked);
          }
        }}
      >
        <div
          className={classNames(
            'rounded-md flex-shrink-0 w-4 h-4 transition-all mr-2 flex items-center justify-center',
            isChecked ? 'bg-primary' : 'bg-gray-400'
          )}
        >
          {isChecked && (
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path
                fill="#FFF"
                d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"
              />
            </svg>
          )}
        </div>
        <div className="leading-relaxed">{children}</div>
      </div>
      <div>
        {feedback && (
          <InputFeedback
            testId={testId ? testId + '-error' : undefined}
            className="mt-0"
            color={state === 'error' ? 'danger' : undefined}
          >
            {feedback}
          </InputFeedback>
        )}
      </div>
    </div>
  );
}
