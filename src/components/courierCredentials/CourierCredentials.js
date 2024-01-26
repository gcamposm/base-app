import { useState, useEffect } from 'react';
import { Spin, Table, Row, Col, Input, Select, Button, Tooltip, Switch, Popconfirm } from 'antd';
import { FaKey } from 'react-icons/fa';
import { Padding, Margin } from '~/src/components/library';
import { withCourierCredentials } from '~/src/components/courierCredentials/containers/CourierCredentialsContainer';

const InputGroup = Input.Group;
const { Option } = Select;

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 14,
  lg: 14,
  xl: 14,
  xxl: 14,
  style: { marginBottom: '5px' }
};

const smallTopColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 4,
  style: { marginBottom: '5px' }
};

const { Column } = Table;

const CourierCredentials = ({
  courierCredentials,
  courierCredentialsLoading,
  requestCourierCredentials,
  showModal,
  requestCourierCredential,
  deactivateCourierCredential,
  activateCourierCredential,
  deleteCourierCredential
}) => {
  const [selectInput, setSelectInput] = useState('id');
  const [searchInput, setSearchInput] = useState('');
  const handleSelect = e => setSelectInput(e);

  const handleSearch = event => setSearchInput(event.target.value);

  useEffect(() => {
    requestCourierCredentials();
  }, []);

  const handleSubmit = () => {
    if (selectInput !== 'all') {
      const filters = { name: selectInput, value: searchInput };
      requestCourierCredentials(filters);
    } else {
      requestCourierCredentials();
    }
  };

  const openCourierCredentialsModal = () => {
    showModal('COURIER_CREDENTIALS');
  };

  return (
    <>
      <Margin>
        <Padding>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <InputGroup compact>
                <Select value={selectInput} style={{ width: '30%' }} onSelect={handleSelect}>
                  <Option value="all">Todos</Option>
                  <Option value="id">Id</Option>
                  <Option value="courier_id">Id de Courier</Option>
                  <Option value="courier_service_type_id">Id de Tipo de Servicio de Courier</Option>
                  <Option value="company_id">Id de Compañía</Option>
                  <Option value="origin_id">Id de Origen</Option>
                </Select>
                <Input style={{ width: '70%' }} onChange={handleSearch} />
              </InputGroup>
            </Col>
            <Col {...smallTopColResponsiveProps}>
              <Button style={{ width: '100%' }} type="primary" onClick={handleSubmit}>
                Buscar
              </Button>
            </Col>
            <Col {...smallTopColResponsiveProps}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => {
                  openCourierCredentialsModal();
                }}
              >
                <FaKey style={{ marginRight: '12px' }} />
                <span>Nueva Credencial</span>
              </Button>
            </Col>
          </Row>
          <Table
            loading={courierCredentialsLoading}
            rowKey="id"
            pagination={{ defaultPageSize: 50, hideOnSinglePage: true }}
            size="small"
            dataSource={courierCredentials}
          >
            <Spin spinning={courierCredentialsLoading}>
              <Column title="#" dataIndex="id" key="id" />
              <Column title="Courier" dataIndex="courier_name" key="courier_name" />
              <Column
                title="Tipo Servicio de Courier"
                dataIndex="courier_service_type_name"
                key="courier_service_type_name"
              />
              <Column
                title="Descripción"
                dataIndex="description"
                key="description"
                ellipsis={{ showTitle: false }}
                render={value => (
                  <Tooltip placement="topLeft" title={value}>
                    {value}
                  </Tooltip>
                )}
              />
              <Column
                title="Estado"
                dataIndex="is_active"
                key="is_active"
                render={value => {
                  return <Switch checked={value} disabled />;
                }}
              />
              <Column title="Última actualización" dataIndex="updated_at" key="updated_at" />
              <Column title="Último editor" dataIndex="last_modified_by" key="last_modified_by" />
              <Column
                title="Acciones"
                dataIndex="id"
                key="id"
                render={(id, data) => {
                  return (
                    <>
                      <a
                        href=""
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          requestCourierCredential(id);
                          openCourierCredentialsModal(id);
                        }}
                      >
                        Editar
                      </a>
                      {' | '}
                      {data.is_active ? (
                        <Popconfirm
                          title="¿Seguro que quieres desactivar?"
                          onConfirm={() => {
                            deactivateCourierCredential(id);
                          }}
                          onCancel={() => {}}
                          cancelText="No"
                          okText="Sí, Desactivar"
                        >
                          <a
                            href=""
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            Desactivar
                          </a>
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="¿Seguro que quieres activar?"
                          onConfirm={() => {
                            activateCourierCredential(id);
                          }}
                          onCancel={() => {}}
                          cancelText="No"
                          okText="Sí, Activar"
                        >
                          <a
                            href=""
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            Activar
                          </a>
                        </Popconfirm>
                      )}
                      {' | '}
                      <Popconfirm
                        title="¿Seguro que quieres eliminar?"
                        onConfirm={() => {
                          deleteCourierCredential(id);
                        }}
                        onCancel={() => {}}
                        cancelText="No"
                        okText="Sí, Eliminar"
                      >
                        <a
                          href=""
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          Eliminar
                        </a>
                      </Popconfirm>
                    </>
                  );
                }}
              />
            </Spin>
          </Table>
        </Padding>
      </Margin>
    </>
  );
};

export default withCourierCredentials(CourierCredentials);
