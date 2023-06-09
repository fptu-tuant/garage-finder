import { Button, Typography } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetGarageByIdApi } from '@/api';
import { ServiceCard } from '@/components';
import { ClockIcon, PinMapFilledIcon } from '@/icons';

type RouteParams = {
  garageId: string;
};

export default function GarageDetailPage() {
  const router = useRouter();
  const { garageId = null } = router.query as RouteParams;

  const { data: garage } = useGetGarageByIdApi();

  const openTime = dayjs(garage.openTime, 'hh:mm:ss').format('hh:mm');
  const closeTime = dayjs(garage.closeTime, 'hh:mm:ss').format('hh:mm');

  return (
    <>
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
        <div className="border border-rose-400 border-solid relative">
          <Image alt="Main Image" src="" fill />
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <div className="border border-rose-400 border-solid relative">
            <Image alt="sub Image" src="" fill />
          </div>
          <div className="border border-rose-400 border-solid relative">
            <Image alt="sub Image" src="" fill />
          </div>
          <div className="border border-rose-400 border-solid relative">
            <Image alt="sub Image" src="" fill />
          </div>
          <div className="border border-rose-400 border-solid relative">
            <Image alt="sub Image" src="" fill />
          </div>
        </div>
      </div>

      <div className="mt-5 flex">
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
              src={`//maps.google.com/maps?q=${garage.latAddress},${garage.lngAddress}&z=15&output=embed`}
            />
          </div>
        </div>

        <div>order</div>
      </div>
    </>
  );
}
