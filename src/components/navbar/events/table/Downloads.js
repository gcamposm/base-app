import { FaBoxes, FaFilePdf, FaRegImage, FaFileWord, FaFileExcel, FaTag } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { List, Avatar, Icon, Badge, Skeleton, Typography, Row } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const Download = ({ loading, downloads: { data, deleting }, deleteDownload, removeFromStore }) => {
  const sourceIcons = {
    pdf: { color: '#ff0000', component: FaFilePdf, text: 'PDF' },
    xlsx: { color: '#467711', component: FaFileExcel, text: 'XLSX' },
    image: { color: '#7b00ff', component: FaRegImage, text: 'Imagen' },
    docx: { color: '#3878E2', component: FaFileWord, text: 'Documentos' },
    orders: { color: '#3778e2', component: FaBoxes, text: 'Ventas' },
    label: { color: '#3778e2', component: FaTag, text: 'Etiqueta' }
  };

  const status = {
    pending: {
      color: 'gold',
      text: 'Pendiente'
    },
    init: {
      color: 'blue',
      text: 'Inicio'
    },
    downloading: {
      color: 'blue',
      text: 'Descargando'
    },
    success: {
      color: 'green',
      text: 'Éxito'
    },
    failed: {
      color: 'red',
      text: 'Error'
    }
  };

  const getIcon = source => {
    const { component } = sourceIcons[source];
    return <Icon component={component} />;
  };

  const getBadge = itemStatus => {
    const { color, text } = status[itemStatus];
    return <Badge color={color} text={text} style={{ color: '#a0a0a0' }} />;
  };

  const handleDeleteClick = id => {
    deleteDownload(id, () => {
      removeFromStore(id);
    });
  };

  return (
    <>
      {loading || deleting ? (
        <Skeleton active />
      ) : (
        <>
          <Row style={{ marginBottom: '15px' }}>
            <Text type="secondary">Últimas 5 sincronizaciones</Text>
          </Row>
          <Row>
            <List
              size="small"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Icon
                      onClick={() => {
                        handleDeleteClick(item.id);
                      }}
                      style={{ fontSize: '20px' }}
                      component={TiDelete}
                    />
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: sourceIcons[item.kind].color }}
                        icon={getIcon(item.kind)}
                      />
                    }
                    title={<div>Descarga: {item.id}</div>}
                    description={
                      <span>
                        {getBadge(item.status)} {' | '} Fecha:{' '}
                        {moment(item.created_at).format('D/M/YYYY HH:mm')} {' | '} Tipo:{' '}
                        {sourceIcons[item.kind].text}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default Download;
