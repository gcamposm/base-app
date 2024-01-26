/* eslint-disable camelcase */
import { Table, Spin, Button, Switch } from 'antd';
import { withFormik } from 'formik';
import { MinusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../../containers/CourierCredentialsContainer';

const { Column } = Table;

const CourierCredentialKeysBaseTable = ({
  data,
  courierCredentialsLoading,
  deleteCourierCredentialKey
}) => {
  const deleteCurrentCourierCredentialKey = record => {
    const keys = data.map(courierCredentialKey => courierCredentialKey.key);
    const index = keys.indexOf(record.key);
    if (index !== 1) deleteCourierCredentialKey(index);
  };

  return (
    <Table
      loading={courierCredentialsLoading}
      rowKey="id"
      pagination={false}
      size="small"
      dataSource={data}
    >
      <Spin spinning={courierCredentialsLoading}>
        <Column title="Llave" dataIndex="key" key="key" />
        <Column title="Valor" dataIndex="value" key="value" />
        <Column
          title="Requerido"
          dataIndex="required"
          key="required"
          render={value => {
            return <Switch checked={value} disabled />;
          }}
        />
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
                    deleteCurrentCourierCredentialKey(record);
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

export default withCourierCredentials(withFormik({})(CourierCredentialKeysBaseTable));
