import { Popover } from 'antd';
import Icon from '@ant-design/icons';
import { FaQuestionCircle } from 'react-icons/fa';

const PopoverMessage = ({
  title,
  content = '',
  color = '#3878E2',
  icon = null,
  trigger = 'hover',
  onVisibleChange = null,
  fontSize = '',
  onClick = null,
  position = 'top',
  marginRight = null,
  iconPosition = null,
  iconRight = null,
  iconTop = null,
  ...props
}) => {
  return (
    <>
      {title === undefined ? null : <span style={{ paddingRight: '15px' }}>{title}</span>}
      <Popover
        content={content}
        trigger={trigger}
        onVisibleChange={onVisibleChange}
        placement={position}
        {...props}
      >
        <Icon
          style={{
            color,
            fontSize,
            marginRight,
            position: iconPosition,
            right: iconRight,
            top: iconTop
          }}
          component={icon || FaQuestionCircle}
          onClick={onClick}
        />
      </Popover>
    </>
  );
};

export default PopoverMessage;
