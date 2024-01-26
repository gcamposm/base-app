import { memo } from 'react';
import { Form, Input } from 'formik-antd';
import { Row, Col } from 'antd';
import Email from './Email';
import { getAuthInfo } from '../../../utils/auth';

const style = {
  marginBottom: '5px'
};

const col3FormElementsProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 7,
  xl: 7
};

const AccountAuthForm = () => {
  const { roles } = getAuthInfo();

  return (
    <>
      <Row type="flex" justify="space-between">
        <Col {...col3FormElementsProps}>
          <Email label="Email" disabled={!(roles.includes('administrator') || roles.includes('commercial'))} />
        </Col>
        <Col {...col3FormElementsProps}>
          <Form.Item name="password" label="Contraseña" style={style}>
            <Input name="password" placeholder="Contraseña" type="password" />
          </Form.Item>
        </Col>
        <Col {...col3FormElementsProps}>
          <Form.Item name="password_confirmation" label="Confirme Contraseña" style={style}>
            <Input name="password_confirmation" placeholder="Confirme Contraseña" type="password" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default memo(AccountAuthForm);
