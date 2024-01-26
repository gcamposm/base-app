import { Table, Spin, Button } from 'antd';
import { withFormik } from 'formik';
import { MinusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../containers/CourierCredentialsContainer';

const { Column } = Table;

const CourierCredentialRulesTable = ({
  courierCredentialRules,
  courierCredentialNames,
  loading,
  deleteCourierCredentialRule,
  hiddeCourierCredentialType
}) => {
  const returnRule = record => {
    let types = courierCredentialNames.map(courierCredentialName => courierCredentialName.value);
    let index = types.indexOf(record.name);
    if (index !== -1) hiddeCourierCredentialType({ index, hidde: false });
    types = courierCredentialRules.map(courierCredentialRule => courierCredentialRule.name);
    index = types.indexOf(record.name);
    deleteCourierCredentialRule(index);
  };
  return (
    <Table
      loading={loading}
      rowKey="id"
      pagination={false}
      size="small"
      dataSource={courierCredentialRules}
    >
      <Spin spinning={loading}>
        <Column title="Regla" dataIndex="type_translation" key="name" />
        <Column title="Condición" dataIndex="condition_translation" key="condition" />
        <Column title="Valor de Regla" dataIndex="value" key="value" />
        <Column
          title="Acciones"
          dataIndex="id"
          key="id"
          render={(_, record) => {
            return (
              <>
                <Button
                  type="danger"
                  onClick={() => {
                    returnRule(record);
                  }}
                  style={{ padding: '0 0.7rem' }}
                >
                  <MinusOutlined />
                </Button>
              </>
            );
          }}
        />
      </Spin>
    </Table>
  );
};

export default withCourierCredentials(withFormik({})(CourierCredentialRulesTable));
