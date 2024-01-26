/* eslint-disable camelcase */
import { memo } from 'react';
import { Card, Row, Typography, Col, Button, Tag } from 'antd';
import Icon from '@ant-design/icons';
import { FaWhatsapp } from 'react-icons/fa';
import Router from 'next/router';

import { withNotifications } from '../containers/NotificationsContainer';
import TagsTooltip from './TagsTooltip';
import { WhatsappNotificationsTab } from '~/src/utils/constants';

const { Text } = Typography;

const WhatsappEditionsControls = ({
  setWhatsappProps,
  whatsappProps: { subject, tags },
  setWhatsappTest,
  editWhatsappNotificationState,
  whatsappType
}) => {
  const propsByName = WhatsappNotificationsTab;
  const testWhatsapp = () => {
    setWhatsappTest(true);
  };

  const onSave = () => {
    editWhatsappNotificationState(whatsappType, res => {
      Router.push('/settings?tab=notifications');
    });
  };

  return (
    <Card>
      <Row style={{ marginBottom: '25px' }}>
        <Row>
          <Text>
            Esta notificación se enviará cuando el estado del envío cambie a &nbsp;
            <Tag color={propsByName[whatsappType].color}>{propsByName[whatsappType].state}</Tag>
          </Text>
        </Row>
      </Row>
      <TagsTooltip tags={tags} />
      <Row type="flex" justify="start" gutter={5} style={{ marginBottom: '20px' }}>
        <Col>
          <Button onClick={() => testWhatsapp()} type="ghost">
            <Icon component={FaWhatsapp} />
            WhatsApp de prueba
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              Router.push('/settings?tab=notifications');
            }}
            type="danger"
          >
            Cancelar
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={onSave}>
            Guardar
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default withNotifications(memo(WhatsappEditionsControls));
