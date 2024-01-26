import { Form } from 'formik-antd';

const { Item } = Form;

const FormItem = ({ children, name = null, label = null }) => (
  <Item name={name} label={label}>
    {children}
  </Item>
);

export default FormItem;
