import { useEffect } from 'react';
import { Row, Col, Typography, Alert, notification, Button } from 'antd';
import { Form } from 'formik-antd';
import { withFormik } from 'formik';
import { PlusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../../containers/CourierCredentialsContainer';
import { FormInput, SwitchInput } from '~/src/components/library/FormikFormComponents';
import CourierCredentialKeysBaseTable from './CourierCredentialKeysBaseTable';

const { Paragraph } = Typography;

const CourierCredentialKeys = ({
  setValues,
  handleSubmit,
  courierCredentialKeys,
  setShowCourierCredentialKeys
}) => {
  const populateDefaultValues = () => {
    setValues({
      key: '',
      value: '',
      required: true
    });
  };

  useEffect(() => {
    populateDefaultValues();
  }, []);

  return (
    <>
      <Paragraph>
        <Alert message="Estructura Base de Credencial." type="info" showIcon />
      </Paragraph>
      <Form>
        <Row>
          <Col span={8} style={{ paddingLeft: '24px', textAlign: 'left' }}>
            Llave
          </Col>
          <Col span={8}>
            <FormInput name="key" placeholder="Llave" />
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ paddingLeft: '24px', textAlign: 'left' }}>
            Valor
          </Col>
          <Col span={8}>
            <FormInput name="value" placeholder="Valor" />
          </Col>
        </Row>
        <Row>
          <Col span={8} style={{ paddingLeft: '24px', textAlign: 'left' }}>
            Requerido
          </Col>
          <Col span={8}>
            <SwitchInput name="required" />
          </Col>
          <Col span={2} offset={2}>
            <Button
              type="primary"
              onClick={() => {
                handleSubmit();
              }}
              style={{ padding: '0 0.7rem' }}
            >
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
      {courierCredentialKeys.length !== 0 ? (
        <>
          <Row style={{ marginBottom: '1rem' }}>
            <Col span={24} style={{ paddingLeft: '24px', textAlign: 'left' }}>
              <CourierCredentialKeysBaseTable data={courierCredentialKeys} />
            </Col>
          </Row>
          <Row>
            <Col offset={18}>
              <Button
                type="primary"
                onClick={() => {
                  setShowCourierCredentialKeys(true);
                  handleSubmit();
                }}
                style={{ padding: '0 0.7rem' }}
              >
                Crear Estructura Base
              </Button>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default withCourierCredentials(
  withFormik({
    mapPropsToValues: () => ({
      key: '',
      value: '',
      required: true
    }),
    handleSubmit: (
      values,
      {
        resetForm,
        props: {
          addCourierCredentialKey,
          courierCredentialKeys,
          showCourierCredentialKeys,
          setWantAddBaseKey,
          createCredentialKeys,
          courierServiceTypeId,
          requestCredentialKeys
        }
      }
    ) => {
      const validData = () => {
        return values.credential_key && values.credential_value;
      };
      if (validData) {
        const credentialKey = {
          key: values.key,
          value: values.value,
          required: values.required
        };
        if (showCourierCredentialKeys) {
          const massiveCredentialKeys = courierCredentialKeys.map(courierCredentialKey => {
            const keyWithService = courierCredentialKey;
            keyWithService.courier_service_type_id = courierServiceTypeId;
            return keyWithService;
          });
          createCredentialKeys(massiveCredentialKeys, () => {
            requestCredentialKeys(courierServiceTypeId);
          });
          setWantAddBaseKey(false);
        } else {
          const keys = courierCredentialKeys.map(courierCredentialKey => courierCredentialKey.key);
          const index = keys.indexOf(credentialKey.key);
          if (index === -1) {
            addCourierCredentialKey(credentialKey);
            resetForm({ values: { key: '', value: '', required: true } });
          } else {
            notification.error({ message: 'No puede agregar esta llave', duration: 3 });
          }
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
