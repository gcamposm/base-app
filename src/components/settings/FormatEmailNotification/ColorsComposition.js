/* eslint-disable camelcase */
import { memo } from 'react';
import { Row } from 'antd';
import { withNotifications } from '../containers/NotificationsContainer';
import ColorController from './ColorController';

const MarginRow = ({ children }) => (
  <Row style={{ marginBottom: '20px', flexDirection: 'column' }}>{children}</Row>
);

const ColorsComposition = ({
  emailProps: { title_color, title_font_color, tracking_button, tracking_text_color },
  setEmailProps
}) => {
  return (
    <>
      <MarginRow>
        <ColorController
          title="Color Fondo Título"
          color={title_color}
          onChange={color => {
            setEmailProps({ title_color: color.hex });
          }}
        />
        <ColorController
          title="Color Fuente Título"
          color={title_font_color}
          onChange={color => {
            setEmailProps({ title_font_color: color.hex });
          }}
        />
      </MarginRow>
      <MarginRow>
        <ColorController
          title="Color Fondo Nº seguimiento"
          color={tracking_button}
          onChange={color => {
            setEmailProps({ tracking_button: color.hex });
          }}
        />
        <ColorController
          title="Color Fuente Nº seguimiento"
          color={tracking_text_color}
          onChange={color => {
            setEmailProps({ tracking_text_color: color.hex });
          }}
        />
      </MarginRow>
    </>
  );
};

export default withNotifications(memo(ColorsComposition));
