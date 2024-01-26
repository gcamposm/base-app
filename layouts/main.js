import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';

import styles from '../src/assets/main.modules.less';
import ModalDisplayer from '../src/components/modals/ModalDisplayer';
import TopBar from '../src/components/navbar/TopBar';
import SideBar from '../src/components/navbar/SideBar';
import FooterNav from '../src/components/navbar/FooterNav';

const { Sider, Content } = Layout;

const MainPage = ({ children }) => {
  const [collapsed, setCollapsed] = useState();

  const dispatch = useDispatch();

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const marginContent = () => {
    if (collapsed) {
      return { marginLeft: '80px', minHeight: '90vh' };
    }
    return { marginLeft: '200px', minHeight: '90vh' };
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        collapsedWidth="80"
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 99
        }}
        className={styles.aside_border}
      >
        <div className={collapsed ? styles.logo_collapsed : styles.logo_not_collapsed}>
          <img src={collapsed ? "../static/ala.svg" : "../static/logo.svg"} alt="logo" />
        </div>
        <SideBar collapsed={collapsed} />
      </Sider>
      <Layout>
        <TopBar toggle={toggle} collapsed={collapsed} />
        <Content style={marginContent()}>
          <ModalDisplayer />
          {children}
        </Content>
        <FooterNav style={marginContent()} />
      </Layout>
    </Layout>
  );
};

export default React.memo(MainPage);
