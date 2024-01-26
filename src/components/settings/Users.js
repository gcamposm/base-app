import { useState } from 'react';
import { Table, Popconfirm, Row, Button, Icon, Typography } from 'antd';
// import ModalUsers from './ModalUsers';
import styles from '~/src/assets/base/base.modules.less';

const { Title } = Typography;

const Users = () => {
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      key: 1,
      name: 'Alejandro',
      surname: 'Zamora',
      phone: '957753766',
      email: 'azreed@live.com',
      permission: 'global'
    },
    {
      key: 2,
      name: 'Fernando',
      surname: 'Rodriguez',
      phone: '957753892',
      email: 'fernando@live.com',
      permission: 'órdenes'
    },
    {
      key: 3,
      name: 'Ana',
      surname: 'Bolena',
      phone: '957753378',
      email: 'ana@gmail.com',
      permission: 'envios'
    }
  ];

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (value, row) => {
        return `${value} ${row.surname}`;
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Permiso',
      dataIndex: 'permission',
      key: 'permission'
    },
    {
      title: 'Configuración',
      key: 'configuracion',
      render: () => (
        <div>
          <a
            onClick={() => {
              setModalTitle('Editar Usuario');
              setShowModal(true);
            }}
          >
            Editar
          </a>
          {' | '}
          <a>
            <Popconfirm
              title="¿Seguro que quieres eliminar?"
              onConfirm={() => {
                setShowModal(false);
              }}
              onCancel={() => {}}
              cancelText="No"
              okText="Sí, Eliminar"
            >
              Eliminar
            </Popconfirm>
          </a>
        </div>
      )
    }
  ];

  return (
    <>
      <Row className={styles.title}>
        <Title level={4}>Usuarios</Title>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Button
          className={styles.main_buttons}
          type="primary"
          style={{ float: 'right' }}
          onClick={() => {
            setShowModal(true);
            setModalTitle('Nuevo Usuario');
          }}
        >
          <Icon type="plus-circle" />
          Agregar Usuario
        </Button>
      </Row>
      <Row>
        <Table pagination={false} size="small" dataSource={data} columns={columns} />
      </Row>
      {/* modal deleted */}
      {/* <ModalUsers title={modalTitle} visibility={showModal} setVisibility={setShowModal} /> */}
    </>
  );
};

export default Users;
