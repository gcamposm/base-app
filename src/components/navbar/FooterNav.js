import { Layout, Row, Col, Typography } from 'antd';
import moment from 'moment';
import SVG from 'react-inlinesvg';

const { Footer } = Layout;
const { Text } = Typography;

const FooterNav = ({ style: { marginLeft } }) => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        marginLeft,
        position: 'fixed',
        bottom: '0px',
        background: '#FFF',
        width: '100%',
        padding: '0.1rem 0px'
      }}
    >
      <Row type="flex" justify="start" gutter={24} backgroundColor="white">
        <Col span={10}>
          <Text type="secondary">
            {`Shipit Admin © ${moment().year()}. Creado por Shipit con`}
            <SVG src="/static/heart.svg" />
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterNav;
