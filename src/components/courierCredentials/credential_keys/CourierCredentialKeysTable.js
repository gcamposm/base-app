import { useState } from 'react';
import { Table, Spin, Button, notification } from 'antd';
import { withFormik } from 'formik';
import { MinusOutlined } from '@ant-design/icons';
import { withCourierCredentials } from '../containers/CourierCredentialsContainer';
import { FormInput } from '~/src/components/library/FormikFormComponents';

const { Column } = Table;

const CourierCredentialKeysTable = ({
  data,
  courierCredentialsLoading,
  deleteCourierCredentialKey,
  handleSubmit,
  setFieldValue,
  setCourierCredentialKeyId
}) => {
  const [editing, setEditing] = useState(false);

  const handleEditRow = record => {
    setFieldValue('key', record.key);
    setFieldValue('value', record.value);
    setFieldValue('required', record.required);
    setEditing(record.key);
  };

  const isEditing = record => record.key === editing;

  const deleteCurrentCourierCredentialKey = record => {
    const keys = data.map(courierCredentialKey => courierCredentialKey.key);
    const index = keys.indexOf(record.key);
    if (index !== 1) deleteCourierCredentialKey(index);
  };

  const sortData = array => {
    return array.sort((a, b) => a.id - b.id);
  };

  return (
    <Table
      loading={courierCredentialsLoading}
      pagination={false}
      size="small"
      dataSource={sortData(data)}
    >
      <Spin spinning={courierCredentialsLoading}>
        <Column
          title="Llave"
          dataIndex="key"
          key="key"
          render={(value, record) => {
            return <>{isEditing(record) ? <FormInput name="key" /> : value}</>;
          }}
        />
        <Column
          title="Valor"
          dataIndex="value"
          key="value"
          render={(value, record) => {
            return <>{isEditing(record) ? <FormInput name="value" /> : value}</>;
          }}
        />
        <Column
          title="Acciones"
          dataIndex="id"
          key="id"
          render={(_, record) => {
            return (
              <>
                {editing === record.key ? (
                  <Button
                    type="link"
                    onClick={() => {
                      setEditing(false);
                      setCourierCredentialKeyId(record.id);
                      handleSubmit();
                    }}
                  >
                    Guardar
                  </Button>
                ) : (
                  <Button type="link" onClick={() => handleEditRow(record)}>
                    Editar
                  </Button>
                )}
                <Button
                  type="danger"
                  onClick={() => {
                    deleteCurrentCourierCredentialKey(record);
                  }}
                  style={{ padding: '0 0.7rem' }}
                  disabled={record.required}
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

export default withCourierCredentials(
  withFormik({
    mapPropsToValues: () => ({
      credential_key: '',
      credential_value: ''
    }),
    handleSubmit: (
      values,
      {
        resetForm,
        props: {
          addCourierCredentialKey,
          courierCredentialKeys,
          deleteCourierCredentialKey,
          courierCredentialKeyId
        }
      }
    ) => {
      const validData = () => {
        return values.key && values.value;
      };
      if (validData) {
        const credentialKey = {
          id: courierCredentialKeyId,
          key: values.key,
          value: values.value,
          required: values.required
        };
        const ids = courierCredentialKeys.map(courierCredentialKey => courierCredentialKey.id);
        const index = ids.indexOf(courierCredentialKeyId);
        if (index !== -1) deleteCourierCredentialKey(index);
        addCourierCredentialKey(credentialKey);
        resetForm({ values: { key: '', value: '' } });
      } else {
        notification.error({
          message: 'Complete los campos para guardar la credencial',
          duration: 3
        });
      }
    }
  })(CourierCredentialKeysTable)
);
