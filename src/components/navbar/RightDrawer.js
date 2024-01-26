import { Drawer, Row } from 'antd';

import Downloads from './Downloads';

const RightDrawer = ({ setRightDrawer, rightDrawer }) => {
  return (
    <Drawer
      title="Descargas y sincronizaciones"
      placement="right"
      onClose={() => {
        setRightDrawer(false);
      }}
      visible={rightDrawer}
      width={500}
    >
      <Row style={{ flexDirection: 'column' }}>
        <Downloads />
        {/* <EventTabs /> */}
      </Row>
    </Drawer>
  );
};

export default RightDrawer;
