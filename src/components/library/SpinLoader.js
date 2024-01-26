import { Spin } from 'antd';

const SpinLoader = ({ loading, height = '280px', children }) => {
  if (loading) {
    return (
      <Spin spinning={true}>
        <div style={{ width: '100%', height }}></div>
      </Spin>
    );
  }
  return children;
};

export default SpinLoader;
