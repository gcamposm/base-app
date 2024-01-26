import { memo } from 'react';
import { Typography, Select } from 'antd';

const { Option } = Select;
const { Text } = Typography;

const SelectMultiple = ({
  title,
  placeholder,
  optionsArray,
  selectedOptions,
  style = { width: '100%', marginTop: '0.3rem' },
  disabled = false,
  allowClear = false,
  onChangeAction
}) => {
  if (optionsArray && selectedOptions.length > 0) {
    return (
      <>
        <Text>{`Lista de ${placeholder}: `}</Text>
        <Select
          mode="multiple"
          allowClear={allowClear}
          name={`${title}-select`}
          defaultValue={selectedOptions}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeAction}
        >
          {optionsArray.map(option => (
            <Option key={`${title}-${option[0]}`} value={option[0]}>
              {option[1]}
            </Option>
          ))}
        </Select>
      </>
    );
  }
  return null;
};

export default memo(SelectMultiple);
