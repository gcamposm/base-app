import React from 'react';
import { Input } from 'formik-antd';

import FormItem from './FormItem';

const { Password } = Input;

const FormInput = ({
  name,
  testId = null,
  placeholder = '',
  label = null,
  disabled = false,
  type = 'text',
  min = null,
  onChange = null,
  addonBefore = null,
  maxLength = null
}) => {
  return (
    <FormItem name={name} label={label}>
      {type === 'password' ? (
        <Password disabled={disabled} name={name} placeholder={placeholder} type={type} />
      ) : (
        <Input
          data-testid={testId}
          maxLength={maxLength}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          min={min}
          onChange={onChange}
          addonBefore={addonBefore}
        />
      )}
    </FormItem>
  );
};

export default FormInput;
