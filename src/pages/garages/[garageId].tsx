import { MessageFilled, PhoneFilled } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Result,
  Skeleton,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetGarageByIdApi } from '@/api';
import { CarBrandSelect, ServiceCard, ServicesSelect } from '@/components';
import { ClockIcon, PinMapFilledIcon } from '@/icons';
import { email, required } from '@/services';

type RouteParams = {
  garageId: string;
};

export default function GarageDetailPage() {
  const router = useRouter();
  const { garageId = null } = router.query as RouteParams;

  const { data: garage, isLoading } = useGetGarageByIdApi(
    {},
    { id: Number(garageId) }
  );

  if (!garage && !isLoading)
    return (
      <Result
        status={404}
        title="404"
        subTitle="Xin lỗi! Chúng tôi không tìm thấy trang bạn yêu cầu"
      />
    );

  if (!garage) return <Skeleton active loading={true} />;

  const openTime = dayjs(garage.openTime, 'hh:mm:ss').format('hh:mm');
  const closeTime = dayjs(garage.closeTime, 'hh:mm:ss').format('hh:mm');

  return (
    <Skeleton active loading={isLoading}>
      <Typography.Title level={3}>{garage.garageName}</Typography.Title>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PinMapFilledIcon className="text-primary" />
          <span className="text-neutral-600 font-semibold">
            {garage.addressDetail}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="text-primary" />
          <span className="text-neutral-600 font-semibold">
            Giờ mở cửa - đóng cửa: {openTime} - {closeTime}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 min-h-[500px]">
        <div className="relative">
          <Image alt="Main Image" src={garage?.thumbnail || ''} fill />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {garage.imageGarages?.slice(0, 4)?.map((image) => (
            <div
              className="border border-rose-400 border-solid relative"
              key={image.imageID}
            >
              <Image alt="sub Image" src="" fill />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-6">
        <div className="w-3/5 pr-3">
          <Typography.Title level={4}>Các dịch vụ cung cấp</Typography.Title>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <ServiceCard image="" title="Sữa chữa" />
            <ServiceCard image="" title="Tân trang" />
            <ServiceCard image="" title="Bão dưỡng" />
            <ServiceCard image="" title="Cứu hộ" />
          </div>

          <Typography.Title level={4}>Bản đồ</Typography.Title>
          <div className="mt-5">
            <iframe
              title="map"
              className="border-none w-full aspect-video"
              src={`//maps.google.com/maps?q=${garage?.latAddress},${garage?.lngAddress}&z=15&output=embed`}
            />
          </div>
        </div>

        <div className="grow">
          <div className="p-6 border border-neutral-400 border-solid rounded-lg w-full box-border flex flex-col items-center gap-4 mt-16">
            <Typography.Title level={3}>Liên hệ</Typography.Title>
            <Button type="primary" className="w-56">
              <MessageFilled />
              <span>Nhắn tin cho Garage</span>
            </Button>

            <Button type="text" className="w-56 text-xl text-neutral-800">
              <PhoneFilled />
              <span>{garage.phoneNumber}</span>
            </Button>
          </div>

          <div className="p-6 border border-neutral-400 border-solid rounded-lg w-full box-border flex flex-col gap-4 mt-16">
            <Form layout="vertical">
              <Form.Item label="Họ Tên" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                rules={[required(), email()]}
                name="email"
              >
                <Input />
              </Form.Item>

              <Form.Item label="Hãng xe" name="brand">
                <CarBrandSelect mode={undefined} />
              </Form.Item>

              <Form.Item label="Chọn loại dịch vụ" name="services">
                <ServicesSelect />
              </Form.Item>

              <Form.Item label="Chọn thời gian" name="date">
                <DatePicker showTime className="w-full" />
              </Form.Item>

              <Form.Item className="text-center">
                <Button htmlType="submit" type="primary">
                  Đặt lịch
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
