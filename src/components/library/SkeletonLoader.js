import { Skeleton } from 'antd';

const SkeletonLoader = ({ loading, children }) => {
  if (loading) {
    return <Skeleton active />;
  }
  return children;
};

export default SkeletonLoader;
