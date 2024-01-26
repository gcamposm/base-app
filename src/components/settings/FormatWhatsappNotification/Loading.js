import { Row, Col, Skeleton } from 'antd';

const Loading = () => {
  return (
    <Row type="flex" gutter={16} justify="space-between">
      <Col span={12}>
        <Skeleton active />
      </Col>
      <Col span={12}>
        <Skeleton active />
      </Col>
    </Row>
  );
};

export default Loading;
