import { useEffect } from 'react';
import { Row, Col, Button, Typography, Alert, notification } from 'antd';
import { withFormik } from 'formik';
import { PlusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../containers/CourierCredentialsContainer';
import CourierCredentialKeysTable from './CourierCredentialKeysTable';
import { FormInput } from '~/src/components/library/FormikFormComponents';

const { Paragraph } = Typography;

const CourierCredentialKeys = ({ setValues, handleSubmit, courierCredentialKeys }) => {
  const populateDefaultValues = () => {
    setValues({
      credential_key: '',
      credential_value: ''
    });
  };

  useEffect(() => {
    populateDefaultValues();
  }, []);

  return (
    <>
      <Paragraph>
        <Alert message="Estructura de Credencial." type="info" showIcon />
      </Paragraph>
      <Row>
        <Col span={22}>
          <Row>
            <Col span={11} offset={1}>
              Llave
            </Col>
            <Col span={11} offset={1}>
              Valor
            </Col>
          </Row>
          <Row>
            <Col span={11} offset={1}>
              <FormInput name="credential_key" placeholder="Llave" />
            </Col>
            <Col span={11} offset={1}>
              <FormInput name="credential_value" placeholder="Valor" />
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
            style={{ padding: '0 0.7rem', margin: '1rem' }}
          >
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={24} style={{ paddingLeft: '24px', textAlign: 'left' }}>
          <CourierCredentialKeysTable data={courierCredentialKeys} />
        </Col>
      </Row>
    </>
  );
};

export default withCourierCredentials(
  withFormik({
    mapPropsToValues: () => ({
      credential_key: '',
      credential_value: ''
    }),
    handleSubmit: (
      values,
      { resetForm, props: { addCourierCredentialKey, courierCredentialKeys } }
    ) => {
      const validData = () => {
        return values.credential_key && values.credential_value;
      };
      if (validData) {
        const credentialKey = {
          key: values.credential_key,
          value: values.credential_value
        };
        const ids = courierCredentialKeys.map(courierCredentialKey => courierCredentialKey.id);
        const index = ids.indexOf(credentialKey.id);
        if (index === -1) {
          const newId = ids.length === 0 ? 1 : ids.sort().at(-1) + 1;
          credentialKey.id = newId;
          addCourierCredentialKey(credentialKey);
          resetForm({ values: { credential_key: '', credential_value: '' } });
        } else {
          notification.error({ message: 'No puede agregar esta llave', duration: 3 });
        }
      } else {
        notification.error({
          message: 'Complete los campos para guardar la credencial',
          duration: 3
        });
      }
    }
  })(CourierCredentialKeys)
);
