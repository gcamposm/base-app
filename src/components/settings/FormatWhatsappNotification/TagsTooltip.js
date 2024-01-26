/* eslint-disable camelcase */
import { memo } from 'react';
import { Row, Typography, Col, Tooltip, Button } from 'antd';

const { Text } = Typography;

const TagItemButton = ({ text, tag }) => (
  <Col style={{ marginRight: '5px', marginBottom: '5px' }}>
    <Tooltip title={`{${tag}}`}>
      <Button size="small">{text}</Button>
    </Tooltip>
  </Col>
);

const TagsTooltip = ({
  tags: { buyer_name, tracking_number, package_reference, package_courier }
}) => {
  return (
    <Row style={{ marginBottom: '20px' }}>
      <Text>Tags disponibles para agregar al mensaje:</Text>
      <Row type="flex" justify="start" style={{ marginTop: '10px' }}>
        <TagItemButton text="nombre_comprador" tag={buyer_name} />
        <TagItemButton text="enlace_seguimiento" tag={tracking_number} />
        <TagItemButton text="package_reference" tag={package_reference} />
        <TagItemButton text="package_courier" tag={package_courier} />
        <TagItemButton text="mi_empresa" tag={package_courier} />
      </Row>
    </Row>
  );
};

export default memo(TagsTooltip);
