import { Empty } from 'antd';

const CustomEmpty = ({ description }) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={`No tienes ${description || 'Datos'}`}
    />
  );
};

export default CustomEmpty;
