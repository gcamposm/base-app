import { memo } from 'react';
import { Form, Input } from 'formik-antd';

const style = {
  marginBottom: '5px'
};

const Street = ({ withLabels = false, disabled = false, namePrefix = '' }) => (
  <Form.Item name={`${namePrefix}street`} style={style} label={withLabels ? 'Calle' : null}>
    <Input name={`${namePrefix}street`} disabled={disabled} placeholder="Calle" />
  </Form.Item>
);

export default memo(Street);
