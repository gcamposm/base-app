/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import { Layout, Row, Col, Typography, Tooltip } from 'antd';
import Icon, { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FaRegBell } from 'react-icons/fa';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';

const RightDrawer = dynamic(import('./RightDrawer'), { ssr: false });

const { Header } = Layout;
const { Title } = Typography;

const colTopBarLeft = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12
};

const colTopBarRight = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12
};

const colIcons = {
  xs: 4,
  sm: 3,
  md: 2,
  lg: 2,
  xl: 2,
  xxl: 2
};

const TopBar = ({ toggle, collapsed, router: { pathname }, rightDrawer }) => {
  const getPageTitle = () => {
    const paths = {
      courier_credentials: 'Credenciales de Couriers',
      signup: 'Sign Up'
    };

    const rootPath = pathname.split('/')[1];

    return paths[rootPath];
  };

  const menuProps = {
    style: { fontSize: '16px' },
    onClick: toggle
  };

  return (
    <Header
      style={{
        background: '#fff',
        marginLeft: collapsed ? '80px' : '200px',
        padding: '0 20px'
      }}
    >
      <Row gutter={24}>
        <Col {...colTopBarLeft}>
          {collapsed ? <MenuUnfoldOutlined {...menuProps} /> : <MenuFoldOutlined {...menuProps} />}
          <Title level={4} style={{ marginLeft: '15px', display: 'inline-block' }}>
            {getPageTitle()}
          </Title>
        </Col>
        <Col {...colTopBarRight}>
          <Row type="flex" align="middle" justify="end">
            <Col {...colIcons}>
              <Tooltip title="¡Pronto!" placement="bottom">
                <Icon style={{ cursor: 'pointer', color: '#ccc' }} component={FaRegBell} />
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      {rightDrawer ? <RightDrawer /> : null}
    </Header>
  );
};

export default withRouter(TopBar);
