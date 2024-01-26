/* eslint-disable camelcase */
import { memo, useEffect } from 'react';
import { withRouter } from 'next/router';
import { Card, Row, Tooltip, Typography, Button } from 'antd';
import dynamic from 'next/dynamic';
import { withNotifications } from '../containers/NotificationsContainer';
import Footer from './Footer';
import styles from '~/src/assets/settings/index.modules.less';

const CustomEditor = dynamic(import('./CustomEditor'), {
  ssr: false,
  loading: () => null
});

const { Title } = Typography;

const EmailPreview = ({
  emailProps,
  setEmailProps,
  emailProps: { one, two, three, logo },
  router: {
    query: { emailType }
  }
}) => {
  useEffect(() => {
    setEmailProps({ text_one: one, text_two: two, text_three: three });
  }, [one]);

  return (
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
          className={styles.title_icon}
          style={{
            marginTop: '8px',
            marginLeft: '10px',
            color: emailProps.title_font_color
          }}
          editable={{
            onChange: title_text => {
              setEmailProps({ title_text });
            }
          }}
        >
          {emailProps.title_text}
        </Title>
      </Row>
      <div style={{ padding: '30px 0' }}>
        {one ? (
          <CustomEditor
            initialText={one}
            onEditorStateChange={editorHtml => {
              setEmailProps({ text_one: { content: editorHtml } });
            }}
          />
        ) : null}
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
      <div style={{ padding: '30px 0' }}>
        {two ? (
          <CustomEditor
            initialText={two}
            onEditorStateChange={editorHtml => {
              setEmailProps({ text_two: { content: editorHtml } });
            }}
          />
        ) : null}
      </div>
      <div style={{ padding: '30px 0' }}>
        {three ? (
          <CustomEditor
            initialText={three}
            onEditorStateChange={editorHtml => {
              setEmailProps({ text_three: { content: editorHtml } });
            }}
          />
        ) : null}
      </div>
      <Footer
        footer={emailProps.footer}
        backroundColor={emailProps.preferences.background_footer}
        fontColor={emailProps.preferences.font_color_footer}
      />
    </Card>
  );
};

export default withRouter(withNotifications(memo(EmailPreview)));
