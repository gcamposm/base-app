import { useState } from 'react';
import { Row, Popconfirm, Button, Divider } from 'antd';
import { Formik } from 'formik';
import { Form, Table } from 'formik-antd';
import { withOperative } from '../containers/OperativeContainer';
import { FormInput } from '~/src/components/library/FormikFormComponents';
import operativeValidation from '~/src/utils/formValidations/operativeValidation';

const TableContacts = ({
  contacts,
  setFormContact,
  contactForm,
  loading,
  updateContact,
  deleteContact
}) => {
  const [editing, setEditing] = useState(false);

  const handleEditRow = record => {
    setFormContact(record);
    setEditing(record.id);
  };

  const removeContact = record => {
    deleteContact(record);
  };

  const isEditing = record => record.id === editing;

  const update = values => {
    setEditing(false);
    updateContact(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={contactForm}
      validationSchema={operativeValidation}
      render={({ values }) => (
        <Form>
          <Table
            rowKey="id"
            dataSource={contacts}
            loading={loading}
            columns={[
              {
                width: '200px',
                title: 'Correo',
                key: 'email',
                render: (text, record) =>
                  isEditing(record) ? <FormInput name="email" /> : record.email
              },
              {
                width: '200px',
                title: 'Nombre',
                key: 'first_name',
                render: (text, record) =>
                  isEditing(record) ? <FormInput name="first_name" /> : record.first_name
              },
              {
                width: '200px',
                title: 'Apellido',
                key: 'last_name',
                render: (text, record) =>
                  isEditing(record) ? <FormInput name="last_name" /> : record.last_name
              },
              {
                width: '200px',
                title: 'Opciones',
                key: 'action',
                render: (text, row) => {
                  if (editing === row.id) {
                    return (
                      <Row gutter={16} type="flex" justify="space-around">
                        <Button type="link" onClick={() => update(values)}>
                          Guardar
                        </Button>
                        <Divider type="vertical" style={{ height: '30px' }} />
                        <Button type="link" onClick={() => setEditing(false)}>
                          Cancelar
                        </Button>
                      </Row>
                    );
                  }
                  return (
                    <Row gutter={16} type="flex" justify="space-around">
                      <Popconfirm
                        title="¿Seguro que quiere eliminar?"
                        cancelText="No"
                        okText="Sí, eliminar"
                        onCancel={() => {}}
                        onConfirm={() => removeContact(row)}
                      >
                        <Button type="link" onClick={() => removeContact(row)}>
                          Eliminar
                        </Button>
                      </Popconfirm>
                      <Divider type="vertical" style={{ height: '30px' }} />
                      <Button type="link" onClick={() => handleEditRow(row)}>
                        Editar
                      </Button>
                    </Row>
                  );
                }
              }
            ]}
          />
        </Form>
      )}
    />
  );
};

export default withOperative(TableContacts);
