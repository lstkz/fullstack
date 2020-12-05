import React from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
import { Theme as SelectTheme } from 'react-select/src/types';
import ReactSelectCreatable, {
  Props as CreatableProps,
} from 'react-select/creatable';
import { Props } from 'react-select/src/Select';
import { Theme } from 'src/Theme';
import { createGlobalStyle } from 'styled-components';
import AsyncPaginate, {
  Props as AsyncPaginateProps,
} from 'react-select-async-paginate';

export interface SelectProps<OptionType> extends Props<OptionType> {
  valueColor?: string;
}

export interface CreatableSelectProps<OptionType>
  extends CreatableProps<OptionType, false> {}

const SelectStyles = createGlobalStyle`
  .react-select__single-value {
    &&& {
      color: ${Theme.body_color};
    }
  }
  .react-select__control {
    &&& {
      border: 1px solid ${Theme.gray_200};
      border-radius: 5px;
      background-color: #fff;
      transition: border-color 0.2s ease;
      color: ${Theme.body_color};
      min-height: 40px;
    }
  }
  .react-select__control--is-focused {
    &&& {
      border-color: ${Theme.primary};
      background-color: #fff;
      box-shadow: inset 0 1px 1px rgba(31, 45, 61, 0.075),
        0 0 20px rgba(12, 102, 255, 0.1);
    }
  }
  .react-select__placeholder {
    &&& {
      opacity: 1;
      color: ${Theme.gray_600};
    }
  }
`;

const themeProp = (theme: SelectTheme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: Theme.blue,
    neutral20: Theme.gray_200,
  },
});

export function Select<T>(props: SelectProps<T>) {
  const { valueColor } = props;
  const styles: StylesConfig = {};
  if (valueColor) {
    styles.singleValue = base => ({
      ...base,
      color: `${valueColor} !important`,
    });
  }
  return (
    <>
      <SelectStyles />
      <ReactSelect<T>
        {...props}
        // menuPortalTarget={document.body}
        placeholder={props.placeholder || 'Select...'}
        theme={themeProp}
        classNamePrefix="react-select"
        styles={styles}
      />
    </>
  );
}

export function CreatableSelect<T>(props: CreatableSelectProps<T>) {
  return (
    <>
      <SelectStyles />
      <ReactSelectCreatable<T>
        {...props}
        placeholder={props.placeholder || 'Select...'}
        theme={themeProp}
        classNamePrefix="react-select"
      />
    </>
  );
}

export function AsyncSelect<T>(props: AsyncPaginateProps<T>) {
  return (
    <>
      <SelectStyles />
      <AsyncPaginate<T>
        SelectComponent={Select as any}
        {...props}
        placeholder={props.placeholder || 'Select...'}
        theme={themeProp}
        classNamePrefix="react-select"
      />
    </>
  );
}
