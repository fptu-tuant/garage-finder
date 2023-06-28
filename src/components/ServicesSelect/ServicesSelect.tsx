import { Select, SelectProps, Tag } from 'antd';

import { useGetServicesApi } from '@/api';

import { RoundedSelect } from '../RoundSelect/RoundSelect';

type ServicesSelectProps = SelectProps & { rounded?: boolean };

export function ServicesSelect({
  rounded = false,
  ...rest
}: ServicesSelectProps) {
  const { data, isLoading } = useGetServicesApi();

  const options = data?.map((item) => ({
    label: item.categoryName,
    value: item.categoryID,
  }));

  const FinalSelect = rounded ? RoundedSelect : Select;

  return (
    <FinalSelect
      size="large"
      mode="multiple"
      maxTagCount={3}
      tagRender={(props) => (
        <Tag
          {...props}
          className="rounded-full flex h-8  bg-gray-200 items-center"
        >
          {props.label}
        </Tag>
      )}
      className="rounded-full shadow-md"
      options={options}
      placeholder="Loại dịch vụ cung cấp"
      loading={isLoading}
      {...rest}
    />
  );
}
