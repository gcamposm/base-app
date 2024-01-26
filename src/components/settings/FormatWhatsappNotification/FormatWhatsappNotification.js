import { useEffect, useState, memo } from 'react';
import { Input, Row, Col, Typography, Spin, Modal } from 'antd';
import { withNotifications } from '../containers/NotificationsContainer';
import { Padding, Margin } from '~/src/components/library';
import Loading from './Loading';
import WhatsappPreview from './WhatsappPreview';
import WhatsappEditionsControls from './WhatsappEditionsControls';
import ShowWhatsappNotifications from './ShowWhatsappNotifications';

const { Title } = Typography;

const colSpanLeft = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 13
};

const colSpanRight = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 11
};

const FormatWhatsappNotification = ({
  requestWhatsappNotificationState,
  whatsappType,
  whatsappTestRequest,
  loading,
  requestUserPlan,
  plan,
  userPlanLoading
}) => {
  const [ready, setReady] = useState(false);
  const [whatsappTest, setWhatsappTest] = useState(false);
  const [numberStrings, setNumberStrings] = useState('');

  useEffect(() => {
    requestWhatsappNotificationState(whatsappType);
    // requestUserPlan();
    setReady(true);
  }, []);

  const editableNotifications = () => {
    return false;
    return plan === '1';
  };

  return (
    // <Spin spinning={loading || userPlanLoading}>
    <Spin spinning={loading}>
      <Margin>
        {editableNotifications() ? (
          <ShowWhatsappNotifications whatsappType={whatsappType} />
        ) : (
          <>
            <Padding>
              <Row>
                <Col>
                  <Title level={4}>Edición de Notificación</Title>
                </Col>
              </Row>
            </Padding>
            <Padding>
              {/* {userPlanLoading ? ( */}
              {ready ? (
                <Row type="flex" justify="space-between" gutter={16}>
                  <Col {...colSpanLeft} style={{ marginBottom: '10px' }}>
                    <WhatsappEditionsControls
                      whatsappType={whatsappType}
                      setWhatsappTest={setWhatsappTest}
                    />
                  </Col>
                  <Col {...colSpanRight}>
                    <WhatsappPreview whatsappType={whatsappType} />
                  </Col>
                </Row>
              ) : (
                <Loading />
              )}
            </Padding>
          </>
        )}

        <Modal
          visible={whatsappTest}
          closable={false}
          onCancel={() => {
            setWhatsappTest(false);
          }}
          onOk={() => {
            whatsappTestRequest(whatsappType, numberStrings);
            setWhatsappTest(false);
          }}
        >
          Ingresa el número de prueba:
          <Input
            onChange={number => {
              setNumberStrings(number.target.value);
            }}
            placeholder="569111111111"
          />
        </Modal>
      </Margin>
    </Spin>
  );
};

export default withNotifications(memo(FormatWhatsappNotification));
