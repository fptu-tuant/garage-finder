import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { first, last } from 'lodash-es';
import { useRouter } from 'next/router';

import { useAddGarageApi } from '@/api';
import {
  CarBrandSelect,
  RoundedCascader,
  ServicesSelect,
  SingleUploadDragger,
} from '@/components';
import { LOCATION_CASCADER_OPTIONS } from '@/constants';
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
  thumbnail: string;
};

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
        thumbnail: values.thumbnail,
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
        <div className="col-span-2">
          <Form.Item name="thumbnail">
            <SingleUploadDragger />
          </Form.Item>
        </div>

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
            <ServicesSelect rounded />
          </Form.Item>

          <Form.Item name="carCompanies" rules={[required()]}>
            <CarBrandSelect rounded />
          </Form.Item>

          <Form.Item name="address" rules={[required()]}>
            <RoundedCascader
              size="large"
              className="rounded-full shadow-md"
              options={LOCATION_CASCADER_OPTIONS}
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
