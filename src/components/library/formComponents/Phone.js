import { PhoneOutlined } from '@ant-design/icons';
import { Input } from 'formik-antd';

import FormItem from './FormItem';

const Phone = ({
  label = null,
  name = 'phone',
  placeholder,
  type = 'number',
  disabled = false,
  onChange = null
}) => {
  return (
    <FormItem name={name} label={label}>
      <Input
        name={name}
        min="1"
        type={type}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder || 'Teléfono'}
        addonBefore={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    </FormItem>
  );
};

export default Phone;
