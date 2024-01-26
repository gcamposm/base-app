import { memo } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { withNotifications } from '../containers/NotificationsContainer';
import { Padding } from '~/src/components/library';

const { Title } = Typography;

const ShowWhatsappNotifications = ({ whatsappProps: { one } }) => {
  const extractContent = html => {
    return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
  };

  return (
    <>
      <Padding>
        <Row>
          <Col>
            <Title level={4}>Formato WhatsApp al Comprador</Title>
          </Col>
        </Row>
      </Padding>
      <Padding>
        <Row type="flex" justify="space-between" gutter={16}>
          <Col>
            {' '}
            <Card>
              <div style={{ padding: '30px 20px' }}>
                {one ? <Row>{extractContent(one)}</Row> : null}
              </div>
            </Card>
          </Col>
        </Row>
      </Padding>
    </>
  );
};

export default withNotifications(memo(ShowWhatsappNotifications));
