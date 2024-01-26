import { memo } from 'react';
import { Card, Row, Col, Tooltip, Typography, Button } from 'antd';
import { withNotifications } from '../containers/NotificationsContainer';
import { Padding } from '~/src/components/library';
import Footer from './Footer';

const { Title } = Typography;

const ShowEmailNotifications = ({ emailProps: { one, two, logo, ...emailProps }, emailType }) => {
  const extractContent = html => {
    return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
  };

  return (
    <>
      <Padding>
        <Row>
          <Col>
            <Title level={4}>Formato Correo a Comprador</Title>
          </Col>
        </Row>
      </Padding>
      <Padding>
        <Row type="flex" justify="space-between" gutter={16}>
          <Col>
            {' '}
            <Card>
              <Row
                style={{
                  backgroundColor: emailProps.preferences.background_header,
                  width: '100%',
                  height: '70px'
                }}
              >
                <Tooltip title="Edita este elemento en Notificaciones > Configurar Formato">
                  <div style={{ float: 'left', margin: '15px 0 0 10px', width: '50px' }}>
                    <img width="100%" src={logo} alt="logo" />
                  </div>
                </Tooltip>
              </Row>
              <Row
                style={{
                  backgroundColor: emailProps.title_color,
                  marginTop: '20px',
                  width: '100%'
                }}
              >
                <Title
                  level={4}
                  style={{
                    marginTop: '8px',
                    marginLeft: '10px',
                    color: emailProps.title_font_color
                  }}
                >
                  {emailProps.title_text}
                </Title>
              </Row>
              <div style={{ padding: '30px 20px' }}>
                {one ? <Row>{extractContent(one)}</Row> : null}
              </div>
              <Row type="flex" justify="center">
                {emailProps.tracking ? (
                  <Button
                    style={{
                      color: emailProps.tracking_text_color,
                      backgroundColor: emailProps.tracking_button,
                      border: 'none'
                    }}
                  >
                    {emailProps.tracking_text}
                  </Button>
                ) : null}
              </Row>
              {emailType === 'failed' ? (
                <Row type="flex" justify="center" style={{ marginTop: '15px' }}>
                  <Tooltip
                    title="Package Status = Rechazado. 
Courier Status = Motivo por el cual falló entrega (ejemplo: Primer Intento - Domicilio Cerrado)"
                  >
                    <Card>{'{package_status} - {courier_status}'}</Card>
                  </Tooltip>
                </Row>
              ) : null}
              <div style={{ padding: '30px 20px' }}>
                {two ? <Row>{extractContent(two)}</Row> : null}
              </div>
              <Footer
                footer={emailProps.footer}
                backroundColor={emailProps.preferences.background_footer}
                fontColor={emailProps.preferences.font_color_footer}
              />
            </Card>
          </Col>
        </Row>
      </Padding>
    </>
  );
};

export default withNotifications(memo(ShowEmailNotifications));
