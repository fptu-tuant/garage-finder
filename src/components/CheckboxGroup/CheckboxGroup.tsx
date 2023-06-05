import { SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Checkbox, CheckboxOptionType, Input } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { toLower, uniq } from 'lodash-es';
import { useState } from 'react';

type CheckboxGroupProps = {
  placeholder?: string;
  options?: Array<Omit<CheckboxOptionType, 'label'> & { label: string }>;
  value?: CheckboxValueType[];
  onChange?: (value: CheckboxValueType[]) => void;
};

const VerticalCheckboxGroup = styled(Checkbox.Group)`
  display: block;
  max-height: 300px;
  overflow-y: auto;

  label {
    display: flex !important;
    margin-bottom: 0.4em;
  }
`;

export function CheckboxGroup({
  placeholder = 'Search...',
  options = [],
  value: externalValue,
  onChange,
}: CheckboxGroupProps) {
  const [keyword, setKeyword] = useState('');

  const [innerValue, setInnerValue] = useState(externalValue);

  const [currentOptions, setCurrentOptions] = useState(options);

  const value = externalValue || innerValue;

  return (
    <div>
      <Input
        className="mt-4 mb-2"
        placeholder={placeholder}
        suffix={<SearchOutlined />}
        value={keyword}
        onChange={(e) => {
          const { value } = e.currentTarget;

          setKeyword(value);
          setCurrentOptions(
            options.filter(({ label }) =>
              toLower(label).includes(toLower(value))
            )
          );
        }}
      />
      <VerticalCheckboxGroup
        className="trungluc"
        options={currentOptions}
        value={value}
        onChange={(value) => {
          const currentOptionValues = currentOptions.map((e) => e.value);
          const valueNotInCurrentOptions = (innerValue ?? []).filter(
            (value) => !currentOptionValues.includes(value)
          );

          const newValue = uniq([...value, ...valueNotInCurrentOptions]);
          setInnerValue(newValue);
          onChange?.(newValue);
        }}
      />
    </div>
  );
}
