import * as React from 'react';
import classNames from 'classnames';

type BaseProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'placeholder' | 'onChange' | 'type' | 'id' | 'autoComplete'
>;

export interface InputProps extends BaseProps {
  name: string;
  className?: string;
  inputClassName?: string;
  size?: 'small' | 'default' | 'large' | 'extra-large';
  feedback?: string;
  state?: 'error';
  label?: string;
  noMargin?: boolean;
  testId?: string;
  inputRef?: React.LegacyRef<any>;
}

interface InputFeedbackProps {
  color?: 'primary' | 'warning' | 'danger';
  children?: React.ReactNode;
  className?: string;
  testId?: string;
}
export function InputFeedback(props: InputFeedbackProps) {
  const { color, children, className, testId } = props;

  return (
    <div
      data-test={testId}
      className={classNames(
        'text-sm font-light mt-2 text-left',
        className,
        color && `text-${color}`
      )}
    >
      {children}
    </div>
  );
}

export function Input(props: InputProps) {
  const {
    size,
    feedback,
    state,
    className,
    label,
    noMargin,
    testId,
    inputRef,
    inputClassName,
    ...rest
  } = props;
  return (
    <div className={className || 'mb-4'}>
      {label && (
        <label
          className="text-gray-600 text-sm mb-2 font-medium"
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        ref={inputRef}
        data-test={testId}
        style={{
          height:
            size === 'large'
              ? 'calc(1.5em + 2rem + 2px)'
              : 'calc(1.5em + 1.5rem + 2px)',
        }}
        className={classNames(
          inputClassName,
          'block w-full text-gray-700 border border-gray-300 shadow-sm transition-all placeholder-gray-500',
          'outline-none',
          'focus:border-primary focus:shadow-lg focus:placeholder-gray-400',
          size === 'large' && 'px-7 py-4 rounded-lg',
          !size && 'py-3 px-5 rounded-md ',
          state === 'error' && `border-danger focus:border-danger`
        )}
      />
      {feedback && (
        <InputFeedback color={state === 'error' ? 'danger' : undefined}>
          {feedback}
        </InputFeedback>
      )}
    </div>
  );
}
