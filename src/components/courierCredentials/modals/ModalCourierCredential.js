import { useEffect, useState } from 'react';
import { Row, Col, notification, Spin, Alert, Typography, Button } from 'antd';
import { FaQuestionCircle } from 'react-icons/fa';
import { Form, Select } from 'formik-antd';
import { withFormik } from 'formik';
import { FormInput, SwitchInput } from '~/src/components/library/FormikFormComponents';
import { PopoverMessage } from '~/src/components/library';
import ReusableModal from '~/src/components/modals/ReusableModal';
import { withCourierCredentials } from '../containers/CourierCredentialsContainer';
import CourierCredentialKeys from '../credential_keys/CourierCredentialKeys';
import CourierCredentialKeyBase from '../credential_keys/base/CourierCredentialKeyBase';
import CourierCredentialRules from '../courier_credential_rules/CourierCredentialRules';

const { Option } = Select;
const { Paragraph } = Typography;

const ModalCourierCredential = ({
  setValues,
  setFieldValue,
  title,
  hideModal,
  handleSubmit,
  courierCredentialsLoading,
  courierCredential,
  deleteCourierCredential,
  clearCourierCredentialKeys,
  couriers,
  couriersServiceTypes,
  couriersServiceTypesLoading,
  requestCredentialKeys,
  courierCredentialKeys,
  couriersLoading,
  cleanCouriersServiceTypes,
  wantAddBaseKey,
  setWantAddBaseKey,
  showCourierCredentialKeys,
  setShowCourierCredentialKeys,
  setCourierServiceTypeId,
  cleanCourierCredentialRules,
  cleanCourierCredential,
  courierCredentialNames,
  hiddeCourierCredentialType
}) => {
  const [credentialKeysRequested, setCredentialKeysRequested] = useState(false);

  const populateForm = () => {
    setValues({
      description: courierCredential.description,
      is_active: courierCredential.is_active,
      courier_id: courierCredential.courier_id,
      courier_service_type_id: courierCredential.courier_service_type_id
    });
  };

  const populateDefaultValues = () => {
    setValues({
      is_active: true
    });
  };

  useEffect(() => {
    if (courierCredential && courierCredential.id) {
      populateForm();
      setCourierServiceTypeId(courierCredential.courier_service_type_id);
      const types = courierCredentialNames.map(
        courierCredentialName => courierCredentialName.value
      );
      courierCredential.courier_credential_rules.forEach(rule => {
        const index = types.indexOf(rule.name);
        if (index !== -1) hiddeCourierCredentialType({ index, hidde: true });
      });
    } else {
      populateDefaultValues();
    }
  }, [courierCredential]);

  const updateSelectorValue = (key, value) => {
    setFieldValue(key, value);
  };

  const courierCredentialBase = () => {
    if (wantAddBaseKey) return <CourierCredentialKeyBase />;
    if (courierCredentialKeys.length !== 0 || showCourierCredentialKeys)
      return <CourierCredentialKeys />;
    if (!credentialKeysRequested) return null;
    return (
      <>
        <Paragraph>
          <Alert
            message="Este servicio de courier aún no tiene una base de credenciales creada. ¿Deseas agregarla ahora?"
            type="info"
            showIcon
          />
        </Paragraph>
        <Row>
          <Col span={2} offset={10}>
            <Button
              type="info"
              onClick={() => {
                setWantAddBaseKey(true);
              }}
              style={{ padding: '0 0.7rem' }}
            >
              Sí
            </Button>
          </Col>
          <Col span={11} offset={1}>
            <Button
              type="info"
              onClick={() => {
                setShowCourierCredentialKeys(true);
              }}
              style={{ padding: '0 0.7rem' }}
            >
              No
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const requestServiceTypes = courierId => {
    setCredentialKeysRequested(false);
    updateSelectorValue('courier_id', courierId);
  };

  const updateCourierServiceTypeId = courierServiceTypeId => {
    updateSelectorValue('courier_service_type_id', courierServiceTypeId);
    setCourierServiceTypeId(courierServiceTypeId);
    setWantAddBaseKey(false);
    setShowCourierCredentialKeys(false);
    requestCredentialKeys(courierServiceTypeId);
    setCredentialKeysRequested(true);
  };

  const hideModalActions = () => {
    hideModal();
    cleanCouriersServiceTypes();
    clearCourierCredentialKeys();
    setShowCourierCredentialKeys(false);
    cleanCourierCredentialRules();
    cleanCourierCredential();
  };

  return (
    <ReusableModal
      title={title}
      clearAction={() => {
        hideModalActions();
      }}
      onSave={() => {
        handleSubmit();
      }}
      onDelete={() => {
        if (![null, undefined, ''].includes(courierCredential.id)) {
          deleteCourierCredential(courierCredential.id);
          hideModalActions();
        }
        return null;
      }}
      buttonLoading={courierCredentialsLoading}
      disabled={wantAddBaseKey}
    >
      <Spin spinning={courierCredentialsLoading}>
        <Form>
          <Row>
            <Col span={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
              Descripción
            </Col>
            <Col span={12}>
              <FormInput name="description" placeholder="Descripción" />
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
              Courier
            </Col>
            <Col span={12}>
              <Form.Item name="courier_id">
                <Select
                  name="courier_id"
                  showSearch
                  placeholder="Seleccionar Courier"
                  optionFilterProp="children"
                  loading={couriersLoading}
                  disabled={couriersLoading}
                  onChange={courierId => requestServiceTypes(courierId)}
                >
                  {couriers &&
                    couriers.map(courier => (
                      <Option key={courier.id} value={courier.id}>
                        {courier.display_name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
              Tipo de Servicio
            </Col>
            <Col span={12}>
              <Form.Item name="courier_service_type_id">
                <Select
                  name="courier_service_type_id"
                  showSearch
                  placeholder="Seleccionar Tipo"
                  optionFilterProp="children"
                  loading={couriersServiceTypesLoading}
                  disabled={couriersServiceTypesLoading}
                  onChange={courierServiceTypeId => {
                    updateCourierServiceTypeId(courierServiceTypeId);
                  }}
                >
                  {couriersServiceTypes &&
                    couriersServiceTypes.map(couriersServiceType => (
                      <Option key={couriersServiceType.id} value={couriersServiceType.id}>
                        {couriersServiceType.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
              Activar Credencial de Courier
              {!(courierCredential && courierCredential.id) ? (
                <PopoverMessage
                  content="Este campo solo puede ser editado luego de su creación."
                  icon={FaQuestionCircle}
                />
              ) : null}
            </Col>
            <Col span={12}>
              <SwitchInput
                name="is_active"
                disabled={!(courierCredential && courierCredential.id)}
              />
            </Col>
          </Row>
          <Paragraph>
            <Alert message="Reglas de Credencial." type="info" showIcon />
          </Paragraph>
          <CourierCredentialRules />
          {courierCredentialBase()}
        </Form>
      </Spin>
    </ReusableModal>
  );
};

export default withCourierCredentials(
  withFormik({
    mapPropsToValues: () => ({
      description: '',
      is_active: '',
      value: ''
    }),
    handleSubmit: (
      values,
      {
        props: {
          courierCredential,
          onSuccessMessage,
          editCourierCredential,
          createCourierCredential,
          requestCourierCredentials,
          hideModal,
          courierCredentialKeys,
          cleanCouriersServiceTypes,
          setShowCourierCredentialKeys,
          courierServiceTypeId,
          courierCredentialRules,
          cleanCourierCredentialRules,
          clearCourierCredentialKeys,
          cleanCourierCredential
        }
      }
    ) => {
      const validValue = value => {
        return ![null, ''].includes(value);
      };
      const validData = () => {
        const value = values.description && values.is_active;
        return (
          validValue(courierServiceTypeId) && validValue(value) && courierCredentialKeys.length > 0
        );
      };
      if (validData()) {
        const keys = courierCredentialKeys.reduce((hash, courierCredentialKey) => {
          const returnHash = hash;
          returnHash[courierCredentialKey.key] = courierCredentialKey.value;
          return returnHash;
        }, {});
        const newCourierCredential = {
          courier_credential: {
            description: values.description,
            is_active: [null, undefined, ''].includes(values.is_active) ? true : values.is_active,
            keys,
            courier_service_type_id: courierServiceTypeId,
            courier_credential_rules_attributes: courierCredentialRules
          }
        };
        const hideModalActions = () => {
          hideModal();
          cleanCouriersServiceTypes();
          clearCourierCredentialKeys();
          setShowCourierCredentialKeys(false);
          cleanCourierCredentialRules();
          cleanCourierCredential();
        };
        if (courierCredential) {
          editCourierCredential({ ...newCourierCredential, id: courierCredential.id }, () => {
            hideModalActions();
            requestCourierCredentials();
            notification.success({ message: onSuccessMessage, duration: 3 });
          });
        } else {
          createCourierCredential(newCourierCredential, () => {
            hideModalActions();
            requestCourierCredentials();
            notification.success({ message: onSuccessMessage, duration: 3 });
          });
        }
      } else {
        notification.error({
          message: 'Complete los campos para guardar la credencial',
          duration: 3
        });
      }
    }
  })(ModalCourierCredential)
);
