import { Popover, Badge } from 'antd';
import Icon from '@ant-design/icons';
import { FaTicketAlt } from 'react-icons/fa';

const defaultBadgeStyle = {
  minWidth: '3px',
  height: '11px',
  padding: '0 3px',
  fontSize: '8px',
  lineHeight: '11px',
  borderRadius: '8px'
};

const PopoverMessageWithBadge = ({
  content = '',
  iconColor = '#3878E2',
  icon = null,
  badgeStyle = {},
  style = {},
  trigger = 'hover',
  onVisibleChange = null,
  fontSize = '',
  onClick = null,
  key = '',
  count = 0
}) => {
  return (
    <Popover
      key={`popover_message_with_badge_${key}`}
      content={content}
      trigger={trigger}
      onVisibleChange={onVisibleChange}
    >
      <Badge
        key={`popover_badge_${key}`}
        count={count}
        overflowCount={6}
        style={{
          ...defaultBadgeStyle,
          ...badgeStyle
        }}
      >
        <Icon
          key={`popover_icon_${key}`}
          style={{ color: iconColor, fontSize, ...style }}
          component={icon || FaTicketAlt}
          onClick={onClick}
        />
      </Badge>
    </Popover>
  );
};

export default PopoverMessageWithBadge;
