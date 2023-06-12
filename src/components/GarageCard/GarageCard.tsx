import { Button, Divider, Rate } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { HeartFilledIcon, PinMapFilledIcon } from '@/icons';

type GarageCardProps = {
  id: number;
  image: string;
  title: string;
  address: string;
  totalRate: number;
  rating: number;
};

export function GarageCard({
  id,
  image,
  title,
  address,
  rating,
  totalRate,
}: GarageCardProps) {
  const router = useRouter();

  const onGotoDetailPage = () => {
    router.push(`/garages/${id}`);
  };

  return (
    <div className="rounded-md overflow-hidden shadow-md bg-white flex flex-col">
      <div className="relative aspect-video">
        <Image src={image} fill alt={title} className="object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-3 grow">
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-lg line-clamp-1 grow">
            {title}
          </span>
          <HeartFilledIcon className="text-rose-600 text-xl" />
        </div>

        <div className="flex gap-2 items-center">
          <PinMapFilledIcon className="text-rose-600 text-xl shrink-0" />
          <span className="text-neutral-600">{address}</span>
        </div>

        <div className="flex gap-1 text-neutral-600 items-center justify-between text-sm mt-8 grow">
          <div>({totalRate} đánh giá)</div>

          <div className="flex items-center gap-1">
            <Rate className="text-xs" value={rating} disabled />
            {rating}
          </div>
        </div>

        <Button className="mt-8" type="primary" onClick={onGotoDetailPage}>
          Đặt lịch ngay
        </Button>
      </div>
    </div>
  );
}
