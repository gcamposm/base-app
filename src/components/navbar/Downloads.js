import moment from 'moment';
import { List, Avatar, Badge, Skeleton, Typography, Row } from 'antd';
import Icon from '@ant-design/icons';
import { TiDelete } from 'react-icons/ti';

import { sourceItem, status } from '~/src/utils/downloadConstants';

const { Text } = Typography;

const Download = ({ loading, downloads: { data, deleting }, deleteDownload, removeFromStore }) => {
  const getIcon = source => {
    const { component } = sourceItem[source];
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
            <Text type="secondary">Últimas 5 descargas y sincronizaciones</Text>
          </Row>
          <Row style={{ flexDirection: 'column' }}>
            <List
              size="small"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item
                  style={{ paddingLeft: '0', paddingRight: '0' }}
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
                        style={{ backgroundColor: sourceItem[item.kind].color }}
                        icon={getIcon(item.kind)}
                      />
                    }
                    title={<div>{`${sourceItem[item.kind].text} ${item.id}`}</div>}
                    description={
                      <>
                        <p style={{ marginBottom: '0px' }}>
                          {item.link === null ? null : (
                            <>
                              <a
                                href="#"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(item.link);
                                }}
                              >
                                Descargar
                              </a>
                              <br />
                            </>
                          )}
                          <span>
                            {getBadge(item.status)}
                            {' | Fecha: '}
                            {moment(item.created_at).format('D/M/YYYY HH:mm')}
                            {' | Tipo: '}
                            {sourceItem[item.kind].text}
                          </span>
                        </p>
                      </>
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
