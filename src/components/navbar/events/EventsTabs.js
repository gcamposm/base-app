import { Tabs } from 'antd';
import { Downloads, Logs, Notifications } from './table';

const { TabPane } = Tabs;

const EventTabs = () => {
  return (
    <Tabs size="small" className="custom-left-tabs">
      <TabPane tab="Sincronización" key="downloads">
        <Downloads />
      </TabPane>
      <TabPane tab="Notificaciones" key="notifications">
        <Notifications />
      </TabPane>
      {/* <TabPane tab="Log" key="logs">
        <Logs />
      </TabPane> */}
    </Tabs>
  );
};

export default EventTabs;
