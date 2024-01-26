import React from 'react';
import { Checkbox } from 'formik-antd';

import FormItem from './FormItem';

const FormCheckbox = ({ name, disabled = false, children }) => {
  return (
    <FormItem name={name}>
      <Checkbox disabled={disabled} name={name}>
        {children}
      </Checkbox>
    </FormItem>
  );
};

export default FormCheckbox;
