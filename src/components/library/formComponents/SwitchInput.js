import React from 'react';
import { Switch } from 'formik-antd';
import FormItem from './FormItem';

const SwitchInput = ({
  name,
  label = null,
  disabled = false,
  value = false,
  onChange = null,
  style = null,
  size = 'default',
  testId = null
}) => {
  return (
    <FormItem name={name} label={label} style={style}>
      <Switch
        data-testid={testId}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        size={size}
      />
    </FormItem>
  );
};

export default SwitchInput;
