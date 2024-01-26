import { Popover } from 'antd';

const PopoverWithoutIconMessage = ({
  title,
  content = '',
  trigger = 'hover',
  onVisibleChange = null
}) => {
  return (
    <>
      <Popover content={content} trigger={trigger} onVisibleChange={onVisibleChange}>
        {title}
      </Popover>
    </>
  );
};

export default PopoverWithoutIconMessage;
