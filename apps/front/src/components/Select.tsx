import React from 'react';
import ReactSelect, { StylesConfig } from 'react-select';

import { Theme as SelectTheme } from 'react-select/src/types';
import ReactSelectCreatable, {
  Props as CreatableProps,
} from 'react-select/creatable';
import { Props } from 'react-select/src/Select';
import AsyncPaginate, {
  Props as AsyncPaginateProps,
} from 'react-select-async-paginate';

export interface SelectProps<OptionType> extends Props<OptionType> {
  valueColor?: string;
  id: string;
}

export interface CreatableSelectProps<OptionType>
  extends CreatableProps<OptionType, false> {}

const themeProp = (theme: SelectTheme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#008aff',
    neutral20: '#eaecf3',
  },
});

export function Select<T>(props: SelectProps<T>) {
  const { valueColor, id } = props;
  const styles: StylesConfig = {};
  if (valueColor) {
    styles.singleValue = base => ({
      ...base,
      color: `${valueColor} !important`,
    });
  }
  return (
    <>
      <ReactSelect
        instanceId={id}
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
