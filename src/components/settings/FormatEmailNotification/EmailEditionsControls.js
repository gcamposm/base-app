/* eslint-disable camelcase */
import { memo } from 'react';
import { Card, Row, Typography, Switch, Col, Button } from 'antd';
import Router, { withRouter } from 'next/router';
import { withNotifications } from '../containers/NotificationsContainer';
import TagsTooltip from './TagsTooltip';
import ColorsComposition from './ColorsComposition';

const { Text } = Typography;

const MarginRow = ({ style, children }) => (
  <Row style={{ marginBottom: '20px', ...style }}>{children}</Row>
);

const EmailEditionsControls = ({
  setEmailProps,
  emailProps: { subject, tracking, tracking_text, tags },
  setEmailTest,
  editEmailNotificationState,
  router: {
    query: { emailType, id }
  }
}) => {
  const testEmail = () => {
    setEmailTest(true);
  };

  const onSave = () => {
    editEmailNotificationState(emailType, id);
    Router.push(`/companies/show?id=${id}&tab=notifications`);
  };

  return (
    <Card>
      <Row style={{ flexDirection: 'column', marginBottom: '25px' }}>
        <Row>
          <Text strong>Asunto</Text>
        </Row>
        <Row>
          <Text
            editable={{
              onChange: e => {
                setEmailProps({ subject: e });
              }
            }}
          >
            {subject}
          </Text>
        </Row>
      </Row>
      <ColorsComposition />
      <MarginRow>
        Habilitar botón Nº seguimiento
        <Switch
          checked={tracking}
          style={{ marginLeft: '10px' }}
          onChange={() => {
            setEmailProps({ tracking: !tracking });
          }}
        />
      </MarginRow>
      <MarginRow style={{ flexDirection: 'column' }}>
        <Col>Texto botón Nº seguimiento</Col>
        <Col style={{ margin: '5px 0' }}>
          <Text
            editable={{
              onChange: e => {
                setEmailProps({ tracking_text: e });
              }
            }}
          >
            {tracking_text}
          </Text>
        </Col>
      </MarginRow>
      <TagsTooltip tags={tags} />
      <Row
        type="flex"
        justify="start"
        gutter={5}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <Col>
          <Button onClick={() => testEmail()} type="ghost">
            Correo de prueba
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              Router.push(`/companies/show?id=${id}&tab=notifications`);
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

export default withRouter(withNotifications(memo(EmailEditionsControls)));
