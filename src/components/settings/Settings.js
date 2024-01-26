import { Tabs } from 'antd';
import Router from 'next/router';
import Users from './Users';
import Couriers from './Couriers';
import ApiConf from './ApiConf';
import Addresses from './Addresses';
import Labels from './Labels';
import Packing from './Packing';
import Notifications from './Notifications';
import Products from './Products';
import AdminInfo from './AdminInfo';
import Information from './Information';
import MyAccount from './MyAccount';
import Integrations from './Integrations';
import Insurances from './Insurances';
import Plans from './Plans';
import { Padding, Margin } from '~./src/components/library';

const { TabPane } = Tabs;

const Settings = ({ currentTab }) => {
  const checkIfActive = currentKey => {
    if (currentTab === 'users' || currentTab === 'insurance') Router.push(`/dashboard`);
    return currentTab === currentKey || false;
  };

  const ShowOrDestroy = ({ children, active }) => {
    if (!active) {
      return null;
    }
    return <Padding>{children}</Padding>;
  };

  return (
    <>
      <Margin>
        <Padding>
          <Tabs
            tabPosition="left"
            defaultActiveKey="admin_info"
            onChange={event => {
              Router.push(`/settings?tab=${event}`);
            }}
            activeKey={currentTab || 'admin_info'}
          >
            <TabPane tab="Mi Cuenta" key="my_account">
              <ShowOrDestroy active={checkIfActive('my_account')}>
                <MyAccount />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Información Administrativa" key="admin_info">
              <ShowOrDestroy active={currentTab ? checkIfActive('admin_info') : true}>
                <AdminInfo />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Información Operativa" key="operative_information">
              <ShowOrDestroy active={checkIfActive('operative_information')}>
                <Information />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Planes" key="plans">
              <ShowOrDestroy active={checkIfActive('plans')}>
                <Plans />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Usuarios" key="users" disabled>
              <Padding>
                <Users />
              </Padding>
            </TabPane>
            <TabPane tab="Couriers" key="couriers">
              <ShowOrDestroy active={checkIfActive('couriers')}>
                <Couriers />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Seguro Adicional" key="insurances">
              <ShowOrDestroy active={checkIfActive('insurances')}>
                <Insurances />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Canales de Venta" key="integrations">
              <ShowOrDestroy active={checkIfActive('integrations')}>
                <Integrations />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="API" key="api">
              <ShowOrDestroy active={checkIfActive('api')}>
                <ApiConf />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Etiquetas" key="labels">
              <ShowOrDestroy active={checkIfActive('labels')}>
                <Labels />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Notificaciones" key="notifications">
              <ShowOrDestroy active={checkIfActive('notifications')}>
                <Notifications />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Direcciones" key="address">
              <ShowOrDestroy active={checkIfActive('address')}>
                <Addresses />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Empaques" key="packing">
              <ShowOrDestroy active={checkIfActive('packing')}>
                <Packing />
              </ShowOrDestroy>
            </TabPane>
            <TabPane tab="Productos" key="products" disabled>
              <Padding>
                <Products />
              </Padding>
            </TabPane>
          </Tabs>
        </Padding>
      </Margin>
    </>
  );
};

export default Settings;
