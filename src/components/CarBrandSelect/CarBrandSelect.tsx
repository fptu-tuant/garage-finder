import { Select, SelectProps, Tag } from 'antd';
import Image from 'next/image';

import { useGetCarCompaniesApi } from '@/api';
import { twcx } from '@/utils';

import { RoundedSelect } from '../RoundSelect/RoundSelect';

type CarBrandSelectProps = SelectProps & { rounded?: boolean };

export function CarBrandSelect({
  rounded = false,
  ...rest
}: CarBrandSelectProps) {
  const { data: brands, isLoading } = useGetCarCompaniesApi();

  const options = brands?.map((item) => ({
    label: (
      <div className="flex items-center gap-2">
        <Image
          src={item.imageLink}
          alt={item.brandName}
          width={36}
          height={36}
          className="object-contain"
        />
        <span>{item.brandName}</span>
      </div>
    ),
    value: item.brandID,
  }));

  const FinalSelect = rounded ? RoundedSelect : Select;

  return (
    <FinalSelect
      options={options}
      loading={isLoading}
      placeholder="Hãng xe sửa chữa"
      size="large"
      mode="multiple"
      maxTagCount={2}
      tagRender={(props) => (
        <Tag
          {...props}
          className="rounded-full flex h-8  bg-gray-200 items-center"
        >
          {props.label}
        </Tag>
      )}
      className={twcx({ 'rounded-full shadow-md': rounded })}
      {...rest}
    />
  );
}
