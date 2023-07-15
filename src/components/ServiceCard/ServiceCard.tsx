import { Button, Modal, Table } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

import { useGetServices } from '@/api';

type ServiceCardProps = {
  id: number;
  image: string;
  title: string;
};

export function ServiceCard({ id, image, title }: ServiceCardProps) {
  const { data } = useGetServices({
    queryKey: `${id}`,
    id,
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-40 grid gap-1 grid-cols-2 border border-slate-500 border-solid rounded-md p-4">
        <div className="relative">
          <Image alt="image" src={image} fill />
        </div>
        <div className="flex flex-col items-center justify-around">
          <span className="text-xl font-semibold">{title}</span>
          <Button type="primary" className="w-32" onClick={() => setOpen(true)}>
            Chi tiết
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        title={title}
        closable={false}
        closeIcon={null}
        cancelButtonProps={{ className: 'hidden' }}
      >
        <Table
          columns={[
            {
              title: 'STT',
              render: (_, item) => item.serviceID,
            },
            {
              title: 'Tên dịch vụ',
              render: (_, item) => item.nameService,
            },
            {
              title: 'Giá',
              render: (_, item) => item.cost,
            },
            {
              title: 'Ghi chú',
              render: (_, item) => item.note,
            },
          ]}
          dataSource={data}
          pagination={{ hideOnSinglePage: true }}
        />
      </Modal>
    </>
  );
}
