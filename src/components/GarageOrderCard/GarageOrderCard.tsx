import { PhoneFilled } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { capitalize } from 'lodash-es';

import { useCancelOrderByUser } from '@/api';
import { PinMapFilledIcon } from '@/icons';
import { twcx } from '@/utils';

type GarageOrderCardProps = {
  id: number;
  name: string;
  address: string;
  phone: string;
  carBrand: string;
  category: string[];
  time: string;
  status: string;
  onMutated?: () => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'green';

    case 'open':
      return 'orange';

    case 'reject':
      return 'red';

    case 'cancelled':
      return 'gray';

    case 'done':
      return 'cyan';

    default:
      return;
  }
};

export default function GarageOrderCard({
  id,
  name,
  address,
  carBrand,
  category,
  phone,
  time,
  status,
  onMutated,
}: GarageOrderCardProps) {
  const { mutateAsync: cancelOrder, isLoading } = useCancelOrderByUser({
    onSuccess: onMutated,
  });

  return (
    <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-8">
      <div className="col-span-2 rounded-lg bg-gray-200 p-6">image here</div>
      <div className="col-span-3 pb-4">
        <div className="flex gap-3">
          <h3 className="text-xl font-bold mb-2 mt-0 grow">{name}</h3>
          <div>
            <Tag color={getStatusColor(status)} className="rounded-full">
              {capitalize(status)}
            </Tag>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <PinMapFilledIcon className="text-rose-600" />
          <span>{address}</span>
        </div>

        <div className="flex gap-2 items-center">
          <PhoneFilled className="text-rose-600" />
          <span>{phone}</span>
        </div>

        <div className="mt-6 flex gap-2">
          <div className="font-bold">Xe: </div>
          <div>{carBrand}</div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="font-bold">Loại dịch vụ: </div>
          <div>{category.join(', ')}</div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="font-bold">Thời gian: </div>
          <div>{time}</div>
        </div>

        <Button
          className={twcx('mt-10 bg-red-500 hover:bg-red-500/70', {
            invisible: status !== 'open',
          })}
          type="primary"
          disabled={isLoading}
          loading={isLoading}
          onClick={() => cancelOrder({ id })}
        >
          Hủy đặt
        </Button>
      </div>
    </div>
  );
}
