import { memo } from 'react';
import { Dropdown, Row, Col, Typography } from 'antd';
import { SketchPicker } from 'react-color';

const { Text } = Typography;

const ColorPicker = ({ color, onChange }) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={() => {
        return <SketchPicker disableAlpha color={color} onChange={onChange} />;
      }}
    >
      <div
        style={{
          cursor: 'pointer',
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color,
          marginTop: '3px',
          border: 'solid 1px grey'
        }}
      />
    </Dropdown>
  );
};

const colSpanColors = {
  xs: 8,
  sm: 4,
  md: 4,
  lg: 4,
  xl: 4
};

const colSpanHex = {
  xs: 8,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 6
};

const colTitleColors = {
  xs: 8,
  sm: 8,
  md: 9,
  lg: 12,
  xl: 10
};

const ColorController = ({ title, color, onChange }) => {
  return (
    <Row gutter={16} type="flex" justify="start" style={{ height: '30px' }}>
      <Col {...colTitleColors}>
        <Text>{title}</Text>
      </Col>
      <Col {...colSpanHex}>
        <Text>{color}</Text>
      </Col>
      <Col {...colSpanColors}>
        <ColorPicker color={color} onChange={onChange} />
      </Col>
    </Row>
  );
};

export default memo(ColorController);
