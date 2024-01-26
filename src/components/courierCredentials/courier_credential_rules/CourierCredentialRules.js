import { Row, Col, Button, notification } from 'antd';
import { withFormik } from 'formik';
import { Form, Select, Input } from 'formik-antd';
import { PlusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../containers/CourierCredentialsContainer';
import {
  courierCredentialConditions,
  courierCredentialRuleTypeTranslations,
  courierCredentialRuleConditionTranslations
} from '~/src/utils/constants';
import CourierCredentialRulesTable from './CourierCredentialRulesTable';

const { Option } = Select;

const CourierCredentialKeysTable = ({ handleSubmit, setFieldValue, courierCredentialNames }) => {
  const updateSelectorValue = (key, value) => {
    setFieldValue(key, value);
  };

  return (
    <>
      <Row>
        <Col span={22}>
          <Row>
            <Col span={7} offset={1}>
              Regla
            </Col>
            <Col span={7} offset={1}>
              Condición
            </Col>
            <Col span={7} offset={1}>
              Valor de Regla
            </Col>
          </Row>
          <Row>
            <Col span={7} offset={1}>
              <Form.Item name="name">
                <Select
                  name="name"
                  showSearch
                  placeholder="Seleccionar Regla"
                  optionFilterProp="children"
                  onChange={name => updateSelectorValue('name', name)}
                >
                  {courierCredentialNames &&
                    courierCredentialNames
                      .filter(courierCredentialName => !courierCredentialName.hidden)
                      .map(courierCredentialName => (
                        <Option
                          key={courierCredentialName.value}
                          value={courierCredentialName.value}
                        >
                          {courierCredentialName.translation}
                        </Option>
                      ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item name="condition">
                <Select
                  name="condition"
                  showSearch
                  placeholder="Seleccionar Condición"
                  optionFilterProp="children"
                  onChange={name => updateSelectorValue('condition', name)}
                >
                  {courierCredentialConditions &&
                    courierCredentialConditions.map(courierCredentialCondition => (
                      <Option
                        key={courierCredentialCondition.value}
                        value={courierCredentialCondition.value}
                      >
                        {courierCredentialCondition.translation}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Input
                name="value"
                placeholder="Valor de Regla"
                style={{ marginBottom: '1.3rem', width: '100%' }}
              />
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
          <CourierCredentialRulesTable />
        </Col>
      </Row>
    </>
  );
};

export default withCourierCredentials(
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      condition: '',
      value: ''
    }),
    handleSubmit: (
      values,
      {
        resetForm,
        props: { addCourierCredentialRule, courierCredentialNames, hiddeCourierCredentialType }
      }
    ) => {
      const validData = () => {
        const value = values.name && values.condition && values.value;
        return value !== null && value !== '';
      };
      if (validData) {
        const courierCredentialRule = {
          name: values.name,
          condition: values.condition,
          value: values.value,
          type_translation: courierCredentialRuleTypeTranslations[values.name],
          condition_translation: courierCredentialRuleConditionTranslations[values.condition]
        };
        const types = courierCredentialNames.map(
          courierCredentialName => courierCredentialName.value
        );
        const index = types.indexOf(values.name);
        if (index !== -1) hiddeCourierCredentialType({ index, hidde: true });
        addCourierCredentialRule(courierCredentialRule);
        resetForm({
          values: {
            name: '',
            condition: '',
            value: ''
          }
        });
      } else {
        notification.error({
          message: 'Complete los campos para guardar la regla',
          duration: 3
        });
      }
    }
  })(CourierCredentialKeysTable)
);
