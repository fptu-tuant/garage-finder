import { CheckOutlined, MessageFilled, PhoneFilled } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Result,
  Select,
  Skeleton,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  useAddOrder,
  useAddOrderFromGuest,
  useGetGarageByIdApi,
  useSendVerifyCode,
} from '@/api';
import { useGetMyCarsApi } from '@/api/useGetMyCarsApi';
import { CarBrandSelect, ServiceCard, ServicesSelect } from '@/components';
import { REGEX_VIETNAM_PHONE } from '@/constants';
import { ClockIcon, PinMapFilledIcon } from '@/icons';
import { emailRule, phoneRule, requiredRule } from '@/services';
import { showError, showSuccess } from '@/utils';

type RouteParams = {
  garageId: string;
};

export default function GarageDetailPage() {
  const router = useRouter();
  const { garageId = null } = router.query as RouteParams;

  const [form] = Form.useForm();
  const phone = Form.useWatch('phone', form);

  const { data: garage, isLoading } = useGetGarageByIdApi(
    {},
    { id: Number(garageId) }
  );

  const { mutate: sendCode, isLoading: sendingCode } = useSendVerifyCode({
    onSuccess: () => {
      showSuccess('Mã xác thực đã được gửi!');
    },
    onError: showError,
  });

  const { mutate: addOrderFromGuest, isLoading: addingOrderGuest } =
    useAddOrderFromGuest({
      onSuccess: () => showSuccess('Booking thành công'),
    });

  const { mutate: addOrder, isLoading: addingOrder } = useAddOrder({
    onSuccess: () => showSuccess('Booking thành công'),
  });

  const { data: myCars, isLoading: fetchingMyCars } = useGetMyCarsApi();

  if (!garage && !isLoading)
    return (
      <Result
        status={404}
        title="404"
        subTitle="Xin lỗi! Chúng tôi không tìm thấy trang bạn yêu cầu"
      />
    );

  if (!garage) return <Skeleton active loading={true} />;

  const openTime = dayjs(garage.openTime).format('hh:mm');
  const closeTime = dayjs(garage.closeTime).format('hh:mm');

  const ordering = addingOrderGuest || addingOrder;

  const hasCar = !!myCars?.length;

  console.log({ hasCar });

  const onFinish = (values: any) => {
    console.log('values', values);

    const {
      brand,
      date,
      email,
      name,
      phone,
      services,
      verifyCode,
      typeCar,
      licensePlates,
      carId,
    } = values;

    if (!hasCar) {
      addOrderFromGuest({
        body: {
          garageId: Number(garageId),
          name,
          email,
          phoneNumber: phone,
          verificationCode: verifyCode,
          brandCarID: brand,
          typeCar,
          licensePlates,
          categoryGargeId: services,
          timeAppointment: dayjs(date).toISOString(),
        },
      });
    } else {
      addOrder({
        body: {
          garageId: Number(garageId),
          phoneNumber: phone,
          verificationCode: verifyCode,
          categorygarageId: services,
          carId,
          timeAppointment: dayjs(date).toISOString(),
        },
      });
    }
  };

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

          <Skeleton active loading={fetchingMyCars}>
            <div className="p-6 border border-neutral-400 border-solid rounded-lg w-full box-border flex flex-col gap-4 mt-16">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                {!hasCar && (
                  <Form.Item
                    label="Họ Tên"
                    name="name"
                    rules={[requiredRule()]}
                  >
                    <Input />
                  </Form.Item>
                )}

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[requiredRule(), phoneRule()]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    disabled={
                      sendingCode || !String(phone).match(REGEX_VIETNAM_PHONE)
                    }
                    loading={sendingCode}
                    onClick={() => sendCode({ body: phone })}
                  >
                    Xác thực SMS
                  </Button>
                </Form.Item>

                <Form.Item
                  label="Mã xác thực"
                  name="verifyCode"
                  rules={[requiredRule()]}
                >
                  <Input />
                </Form.Item>

                {!hasCar && (
                  <Form.Item
                    label="Email"
                    rules={[requiredRule(), emailRule()]}
                    name="email"
                  >
                    <Input />
                  </Form.Item>
                )}

                {hasCar ? (
                  <Form.Item name="carId" label="Chọn xe của bạn">
                    <Select
                      options={myCars.map((item) => ({
                        label: `${item.licensePlates}`,
                        value: item.carID,
                      }))}
                    />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item
                      label="Hãng xe"
                      name="brand"
                      rules={[requiredRule()]}
                    >
                      <CarBrandSelect mode={undefined} />
                    </Form.Item>

                    <Form.Item
                      label="Dòng xe"
                      name="typeCar"
                      rules={[requiredRule()]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Biển số xe"
                      name="licensePlates"
                      rules={[requiredRule()]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}

                <Form.Item
                  label="Chọn loại dịch vụ"
                  name="services"
                  rules={[requiredRule()]}
                >
                  <Select
                    options={garage.categoryGarages.map((item) => ({
                      label: item.categoryGarageID,
                      value: item.categoryGarageID,
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  label="Chọn thời gian"
                  name="date"
                  rules={[requiredRule()]}
                >
                  <DatePicker showTime className="w-full" />
                </Form.Item>

                <div className="w-full flex flex-col items-center my-10">
                  <div className="w-4/5 flex gap-1 items-center">
                    <CheckOutlined />
                    <span>Đặt lịch 24/7</span>
                  </div>
                  <div className="w-4/5 flex gap-1 items-center">
                    <CheckOutlined />
                    <span>Không cần thanh toán</span>
                  </div>
                  <div className="w-4/5 flex gap-1 items-center">
                    <CheckOutlined />
                    <span>Đánh giá trung thực</span>
                  </div>
                </div>

                <Form.Item className="text-center">
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={ordering}
                    loading={ordering}
                  >
                    Đặt lịch
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Skeleton>
        </div>
      </div>
    </Skeleton>
  );
}
