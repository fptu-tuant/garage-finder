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
import { useState } from 'react';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

import { useGetGarageByIdApi, useUpdateGarage } from '@/api';
import { PlaceAutoCompleted, SingleUploadDragger } from '@/components';
import { VIETNAM_PROVINCES } from '@/constants';
import { ManageGarageLayout } from '@/layouts';
import { phoneRule, requiredRule } from '@/services';
import { showError, showSuccess } from '@/utils';

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

  const [location, setLocation] = useState({ lat: 10, lng: 106 });
  const [zoom, setZoom] = useState(16);

  const { mutateAsync: updateGarage, isLoading: updatingGarage } =
    useUpdateGarage();
  const { data: garage, isLoading: fetchingGarage } = useGetGarageByIdApi(
    { enabled: !isNaN(Number(query?.garageId)) },
    { id: Number(query?.garageId) }
  );

  const onFinish = async () => {
    const values = form.getFieldsValue();
    try {
      const { place_id } = JSON.parse(values?.addressDetail).value;
      const [{ geometry }] = await geocodeByPlaceId(place_id);

      await updateGarage({
        body: {
          ...values,
          garageID: query?.garageId,
          provinceID: first(values?.address),
          districtsID: last(values?.address),
          openTime: (first(values?.time) as Dayjs)?.format('hh:mm A'),
          closeTime: (last(values?.time) as Dayjs)?.format('hh:mm A'),
          // addressDetail: values?.addressDetail?.placeId,
          latAddress: geometry.location.lat(),
          lngAddress: geometry.location.lng(),
          address: undefined,
          time: undefined,
        },
      });
      showSuccess('Cập nhật thông tin thành công!');
    } catch (error) {
      showError(error);
    }
  };

  const initValues = {
    ...garage,
    address: [garage?.provinceID, garage?.districtsID],
    addressDetail: garage?.addressDetail,
    time: [
      dayjs(garage?.openTime, 'hh:mm A'),
      dayjs(garage?.closeTime, 'hh:mm A'),
    ],
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
              <Form.Item
                label="Tên Garage"
                name="garageName"
                rules={[requiredRule()]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="emailAddress"
                rules={[requiredRule()]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[requiredRule(), phoneRule()]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[requiredRule()]}
              >
                <Cascader options={locationCascaderOptions} />
              </Form.Item>

              <Form.Item
                label="Chi tiết địa chỉ"
                name="addressDetail"
                rules={[requiredRule()]}
              >
                <PlaceAutoCompleted />
              </Form.Item>

              <Form.Item
                name="time"
                label="Giờ mở cửa"
                rules={[requiredRule()]}
              >
                <DatePicker.RangePicker
                  className="w-full"
                  picker="time"
                  placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
                  format="hh:mm A"
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
              <Form.Item name="thumbnail" rules={[requiredRule()]}>
                <SingleUploadDragger />
              </Form.Item>
            </div>

            {/* <div className="col-span-4">
              <MapPicker
                defaultLocation={location}
                zoom={zoom}
                className="h-[500px] w-full"
                onChangeLocation={(lat, lng) => {
                  setLocation({ lat, lng });
                }}
                onChangeZoom={setZoom}
                apiKey="AIzaSyDkRSjjCX8h88-czGbVC97_N_qkE-FHEKk"
              />
            </div> */}
          </Form>
        </div>
      </Skeleton>
    </div>
  );
}

ManageGarageInfoPage.Layout = ManageGarageLayout;
