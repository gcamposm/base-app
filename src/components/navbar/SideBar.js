/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'antd';
import Router, { withRouter } from 'next/router';
import Icon, { UserOutlined } from '@ant-design/icons';
import {
  FaShippingFast,
  FaBuilding,
  FaHandHoldingUsd,
  FaTruck,
  FaKey,
  FaSync
} from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import { logout, requestRoles } from '~/src/actions/user';

import styles from '~/src/assets/main.modules.less';

const { SubMenu } = Menu;

const SideBar = ({ collapsed, router: { pathname } }) => {
  const staff = useSelector(state => state.app.person);
  const debtor = useSelector(state => state.app.company.debtors);
  const rootPath = pathname.split('/')[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestRoles());
  }, []);

  const onMenuClick = ({ key }) => {
    switch (key) {
      case '/logout':
        dispatch(logout());
        break;

      default:
        Router.push(key);
        break;
    }
  };
  const onSubMenuClick = ({ key }) => {
    switch (key) {
      case '/logout':
        dispatch(logout());
        break;

      default:
        Router.push(key);
        break;
    }
  };

  const roles = useSelector(state => state.user.roles);
  const hiddenMenuItem = () => {
    return !roles.includes('administrator');
  };

  return (
    <Menu
      className={collapsed ? styles.menu_border_collpased : styles.menu_border}
      defaultSelectedKeys={['1']}
      mode="vertical"
      onClick={onMenuClick}
      selectedKeys={[`/${rootPath}`]}
    >
      <Menu.Item key="/backoffice" disabled={debtor} hidden={hiddenMenuItem()}>
        <Icon component={FaShippingFast} />
        <span>BackOffice</span>
      </Menu.Item>
      <Menu.Item key="/companies">
        <Icon component={FaBuilding} />
        <span>Compañías</span>
      </Menu.Item>
      <Menu.Item key="/statuses" disabled={debtor} hidden={hiddenMenuItem()}>
        <Icon component={FaShippingFast} />
        <span>Estados</span>
      </Menu.Item>
      <SubMenu
        disabled={debtor}
        onTitleClick={onSubMenuClick}
        key="administration"
        title={
          <span>
            <Icon component={FaHandHoldingUsd} />
            <span>Administración</span>
          </span>
        }
      >
        <Menu.Item key="/shipment_discounts" disabled={debtor}>
          <Icon component={AiFillDollarCircle} />
          <span>Descuentos Comerciales</span>
        </Menu.Item>
        <Menu.Item key="/courier_credentials" disabled={debtor}>
          <Icon component={FaKey} />
          <span>Credenciales de couriers</span>
        </Menu.Item>
        <Menu.Item key="/pick_and_packs" disabled={debtor} hidden={hiddenMenuItem()}>
          <Icon component={FaTruck} />
          <span>Retiros</span>
        </Menu.Item>
        <Menu.Item key="/async_processes" disabled={debtor} hidden={hiddenMenuItem()}>
          <Icon component={FaSync} />
          <span>Procesos masivos</span>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        disabled={debtor}
        onTitleClick={onSubMenuClick}
        key="finanzas"
        title={
          <span>
            <Icon component={FaHandHoldingUsd} />
            <span>Finanzas</span>
          </span>
        }
      >
        <Menu.Item key="/monthly_charges" disabled={debtor}>
          <Icon component={AiFillDollarCircle} />
          <span>Cobros mensuales</span>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="user"
        title={
          <span>
            <UserOutlined key="/user" />
            <span>{staff ? staff.first_name : 'Coming Soon 🐛'}</span>
          </span>
        }
      >
        <Menu.Item key="/logout">Cerrar Sesión</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default withRouter(SideBar);
