import { MailOutlined } from '@ant-design/icons';
import { Input } from 'formik-antd';

import FormItem from './FormItem';

const Email = ({
  label = null,
  name = 'email',
  placeholder,
  disabled = false,
  onChange = null,
  onPressEnter = null,
  onBlur = null
}) => (
  <FormItem name={name} label={label}>
    <Input
      name={name}
      disabled={disabled}
      placeholder={placeholder || 'Correo'}
      onChange={onChange}
      onPressEnter={onPressEnter}
      onBlur={onBlur}
      addonBefore={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  </FormItem>
);

export default Email;
