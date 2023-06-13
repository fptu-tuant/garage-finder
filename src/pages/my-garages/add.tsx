import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  Tag,
  Typography,
} from 'antd';
import { Dayjs } from 'dayjs';
import { first, last } from 'lodash-es';
import { useRouter } from 'next/router';

import { useAddGarageApi } from '@/api';
import { CAR_COMPANIES, GARAGE_SERVICES, VIETNAM_PROVINCES } from '@/constants';
import { PinMapFilledIcon, UserIcon } from '@/icons';
import { email, required } from '@/services';
import { showError, showSuccess } from '@/utils';

type AddGarageFormValues = {
  name: string;
  phone: string;
  email: string;
  services: number[];
  carCompanies: number[];
  address: [number, number];
  detailAddress: string;
  openTime: [Dayjs, Dayjs];
};

const locationCascaderOptions = VIETNAM_PROVINCES.map((province) => ({
  label: province.name,
  value: province.code,
  children: province.districts.map((district) => ({
    label: district.name,
    value: district.code,
  })),
}));

const RoundedSelect = styled(Select)`
  .tl-select-selector,
  .tl-select-selection-item {
    border-radius: 999px !important;
  }
`;

const RoundedCascader = styled(Cascader)`
  .tl-select-selector {
    border-radius: 999px !important;
  }
`;

export default function AddGaragePage() {
  const router = useRouter();
  const [form] = Form.useForm<AddGarageFormValues>();

  const { mutate: addGarage, isLoading: adding } = useAddGarageApi({
    onSuccess: () => {
      showSuccess('Đăng ký Garage thành công!');
      router.push('/my-garages');
    },
    onError: showError,
  });

  const onFinish = async () => {
    const values = form.getFieldsValue();

    addGarage({
      body: {
        addressDetail: values.detailAddress,
        brandsID: values.carCompanies,
        categoriesID: values.services,
        openTime: first(values.openTime)?.toISOString(),
        closeTime: last(values.openTime)?.toISOString(),
        provinceID: first(values.address),
        districtsID: last(values.address),
        emailAddress: values.email,
        garageName: values.name,
        phoneNumber: values.phone,
        imageLink: [''],
      },
    });
  };

  return (
    <div>
      <Typography.Title level={2} className="text-center my-10">
        Đăng ký Garage
      </Typography.Title>

      <Form
        form={form}
        className="grid grid-cols-2 gap-10 mx-auto w-max"
        onFinish={onFinish}
      >
        <div>
          <Form.Item className="w-[450px]" name="name" rules={[required()]}>
            <Input
              size="large"
              placeholder="Tên Garage"
              className="rounded-full shadow-md"
              suffix={<UserIcon className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item className="w-[450px]" name="phone" rules={[required()]}>
            <Input
              size="large"
              placeholder="Số điện thoại"
              className="rounded-full shadow-md"
              suffix={<PhoneOutlined className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item
            className="w-[450px]"
            name="email"
            rules={[required(), email()]}
          >
            <Input
              size="large"
              placeholder="Email"
              className="rounded-full shadow-md"
              suffix={<MailOutlined className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item className="w-[450px]" name="openTime" rules={[required()]}>
            <DatePicker.RangePicker
              className="w-full rounded-full shadow-md"
              size="large"
              picker="time"
              placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
              format="hh:mm"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item className="w-[450px]" name="services" rules={[required()]}>
            <RoundedSelect
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
              options={GARAGE_SERVICES}
              placeholder="Loại dịch vụ cung cấp"
            />
          </Form.Item>

          <Form.Item name="carCompanies" rules={[required()]}>
            <RoundedSelect
              size="large"
              maxTagCount={3}
              mode="multiple"
              tagRender={(props) => (
                <Tag {...props} className="rounded-full flex">
                  {props.label}
                </Tag>
              )}
              className="rounded-full shadow-md"
              options={CAR_COMPANIES.map(({ icon: Icon, label, value }) => ({
                label: (
                  <div className="flex items-center gap-2">
                    <Icon className="text-4xl" /> <span>{label}</span>
                  </div>
                ),
                value,
              }))}
              placeholder="Hãng xe sửa chữa"
            />
          </Form.Item>

          <Form.Item name="address" rules={[required()]}>
            <RoundedCascader
              size="large"
              className="rounded-full shadow-md"
              options={locationCascaderOptions}
              placeholder="Địa chỉ"
              showSearch={{
                filter: (inputValue, path) =>
                  path.some(
                    (option) =>
                      (option.label || '')
                        .toString()
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) > -1
                  ),
              }}
            />
          </Form.Item>

          <Form.Item name="detailAddress" rules={[required()]}>
            <Input
              size="large"
              className="rounded-full shadow-md"
              placeholder="Chi tiết địa chỉ"
              suffix={<PinMapFilledIcon className="text-neutral-400" />}
            />
          </Form.Item>
        </div>

        <Form.Item className="mx-auto col-span-2">
          <Button
            type="primary"
            className="min-w-[200px] rounded-full shadow-md shadow-primary"
            size="large"
            loading={adding}
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
