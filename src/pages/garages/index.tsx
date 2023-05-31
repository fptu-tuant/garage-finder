import { Button, Input } from 'antd';

import { GarageCard } from '@/components';

export default function GaragesPage() {
  return (
    <div>
      <div className="w-2/5 flex gap-2 mx-auto">
        <Input placeholder="Tìm kiếm ở đây ..." />
        <Button type="primary" className="min-w-[100px]">
          Tìm
        </Button>
      </div>

      <div className="flex gap-2 my-5">
        <div className="w-1/5">left</div>
        <div className="grow grid grid-cols-4 gap-x-2">
          <GarageCard
            image="https://picsum.photos/1600/900"
            title="Hà Thành Garage"
            address="685 Lạc Long Quân, Phú Thượng, Tây Hồ, Hà Nội"
            totalRate={318}
            rating={4.8}
          />
        </div>
      </div>
    </div>
  );
}
