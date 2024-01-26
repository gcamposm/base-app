import React from 'react';
import { Select } from 'formik-antd';

import FormItem from './FormItem';

const { Option } = Select;

const FormSelect = ({
  dataSource = [],
  name = '',
  label = null,
  disabled = false,
  mode = null,
  loading = false,
  optionKey = 'id',
  optionDesc = 'name',
  optionValue = 'id',
  withFirstOption = false,
  firstOptionValue = '0',
  firstOptionDesc = '',
  customRender = false,
  onChange = null,
  styleSelect = null,
  placeholder = null,
  showSearch = false,
  optionFilterProp = 'children',
  filterOption = null,
  dataTestId = null,
  onSearch = null
}) => {
  return (
    <FormItem name={name} label={label}>
      <Select
        mode={mode}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={dataTestId}
        disabled={disabled}
        showSearch={showSearch}
        loading={loading}
        style={styleSelect}
        optionFilterProp={optionFilterProp}
        filterOption={filterOption}
        onSearch={onSearch}
      >
        {withFirstOption ? (
          <Option value={firstOptionValue}>
            <div style={{ color: '#bfbfbf' }}>{firstOptionDesc}</div>
          </Option>
        ) : null}
        {dataSource &&
          dataSource.map(data => (
            <Option value={data[optionValue]} key={`${name}_${data[optionKey]}`}>
              {typeof customRender === 'function' ? customRender(data) : data[optionDesc]}
            </Option>
          ))}
      </Select>
    </FormItem>
  );
};

export default FormSelect;
