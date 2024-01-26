/* eslint-disable camelcase */
import { useEffect, useState, memo } from 'react';
import { Input, Row, Col, Typography, Spin, Modal } from 'antd';
import { withRouter } from 'next/router';

import { withNotifications } from '../containers/NotificationsContainer';
import { Padding, Margin } from '~/src/components/library';
import EmailPreview from './EmailPreview';
import EmailEditionsControls from './EmailEditionsControls';

import ShowEmailNotifications from '~/src/components/settings/FormatEmailNotification/ShowEmailNotifications';

import Loading from './Loading';

const { Title } = Typography;

const colSpan = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12
};

const FormatEmailNotification = ({
  requestEmailNotificationState,
  notificationTestEmail,
  loadingEmail,
  router: {
    query: { emailType, id }
  }
}) => {
  const [ready, setReady] = useState(false);
  const [emailTest, setEmailTest] = useState(false);
  const [emailStrings, setEmailStrings] = useState('');

  useEffect(() => {
    requestEmailNotificationState(emailType, id);
    setReady(true);
  }, []);

  const editableNotifications = () => {
    return false;
  };

  return (
    // <Spin spinning={loading || userPlanLoading}>
    <Spin spinning={loadingEmail}>
      <Margin>
        {editableNotifications() ? (
          <ShowEmailNotifications emailType={emailType} />
        ) : (
          <>
            <Padding>
              <Row>
                <Col>
                  <Title level={4}>Configurar Formato Correo a Comprador</Title>
                </Col>
              </Row>
            </Padding>
            <Padding>
              {ready ? (
                <Row type="flex" justify="space-between" gutter={16}>
                  <Col {...colSpan} style={{ marginBottom: '10px' }}>
                    <EmailEditionsControls setEmailTest={setEmailTest} />
                  </Col>
                  <Col {...colSpan}>
                    <EmailPreview loading={loadingEmail} />
                  </Col>
                </Row>
              ) : (
                <Loading />
              )}
            </Padding>
          </>
        )}

        <Modal
          visible={emailTest}
          closable={false}
          onCancel={() => {
            setEmailTest(false);
          }}
          onOk={() => {
            notificationTestEmail(emailType, emailStrings, id);
            setEmailTest(false);
          }}
        >
          Ingrese los correos separados por coma:
          <Input
            onChange={mails => {
              setEmailStrings(mails.target.value);
            }}
            placeholder="tu@correo.cl, test@correo.cl, ejemplo@correo.cl"
          />
        </Modal>
      </Margin>
    </Spin>
  );
};

export default withRouter(withNotifications(memo(FormatEmailNotification)));
