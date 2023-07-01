import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Skeleton,
  Typography,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { first, last } from 'lodash-es';
import { useRouter } from 'next/router';

import { useGetGarageByIdApi, useUpdateGarage } from '@/api';
import { SingleUploadDragger } from '@/components';
import { VIETNAM_PROVINCES } from '@/constants';
import { ManageGarageLayout } from '@/layouts';
import { showSuccess } from '@/utils';

const locationCascaderOptions = VIETNAM_PROVINCES.map((province) => ({
  label: province.name,
  value: province.code,
  children: province.districts.map((district) => ({
    label: district.name,
    value: district.code,
  })),
}));

export default function ManageGarageInfoPage() {
  const [form] = Form.useForm();
  const { query } = useRouter();

  const { mutate: updateGarage, isLoading: updatingGarage } = useUpdateGarage();
  const { data: garage, isLoading: fetchingGarage } = useGetGarageByIdApi(
    {
      enabled: !isNaN(Number(query?.garageId)),
      onSuccess: () => showSuccess('Cập nhật thông tin thành công!'),
    },
    { id: Number(query?.garageId) }
  );

  const onFinish = () => {
    const values = form.getFieldsValue();

    updateGarage({
      body: {
        ...values,
        provinceID: first(values?.address),
        districtsID: last(values?.address),
        openTime: (first(values?.time) as Dayjs).toISOString(),
        closeTime: (last(values?.time) as Dayjs).toISOString(),
      },
    });
  };

  const initValues = {
    ...garage,
    address: [garage?.provinceID, garage?.districtsID],
    time: [dayjs(garage?.openTime), dayjs(garage?.closeTime)],
  };

  return (
    <div>
      <Typography.Title level={3}> Thông tin garage</Typography.Title>

      <Skeleton active loading={fetchingGarage}>
        <div>
          <Form
            form={form}
            className="grid grid-cols-4 gap-10"
            labelCol={{ span: 6 }}
            labelAlign="left"
            initialValues={initValues}
            onFinish={onFinish}
          >
            <div className="col-span-2">
              <Form.Item label="Tên Garage" name="garageName">
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="emailAddress">
                <Input />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input />
              </Form.Item>

              <Form.Item label="Địa chỉ" name="address">
                <Cascader options={locationCascaderOptions} />
              </Form.Item>

              <Form.Item label="Chi tiết địa chỉ" name="addressDetail">
                <Input />
              </Form.Item>

              <Form.Item name="time" label="Giờ mở cửa">
                <DatePicker.RangePicker
                  className="w-full"
                  picker="time"
                  placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
                  format="hh:mm"
                />
              </Form.Item>

              <Form.Item className="text-center">
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={updatingGarage}
                  loading={updatingGarage}
                >
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </div>

            <div className="col-span-2">
              <Form.Item name="thumbnail">
                <SingleUploadDragger />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Skeleton>
    </div>
  );
}

ManageGarageInfoPage.Layout = ManageGarageLayout;
