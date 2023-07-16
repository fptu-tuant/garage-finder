import {
  Button,
  Descriptions,
  Image,
  Modal,
  Skeleton,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { isUndefined } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GetOrderGarageData, useGetOrderByGarageId } from '@/api';
import { ManageGarageLayout } from '@/layouts';

function ModalContent({
  brand,
  name,
  phoneNumber,
  typeCar,
  licensePlates,
  color,
  content,
  fileOrders,
  imageOrders,
}: GetOrderGarageData[number]) {
  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Tên khách hàng" span={2}>
          {name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Hãng xe">{brand}</Descriptions.Item>
        <Descriptions.Item label="Dòng xe">{typeCar}</Descriptions.Item>
        <Descriptions.Item label="Biển số">{licensePlates}</Descriptions.Item>
        <Descriptions.Item label="Màu sắc">{color}</Descriptions.Item>
        <Descriptions.Item label="Ngày hoàn thành" span={2}>
          {dayjs().format('DD/MM/YYYY')}
        </Descriptions.Item>

        <Descriptions.Item label="Chi tiết sửa chữa" span={3}>
          {content}
        </Descriptions.Item>

        <Descriptions.Item label="Tệp đính kèm" span={3}>
          <div className="flex flex-col gap-1">
            {fileOrders.map((item) => (
              <Link
                href={item}
                target="_blank"
                key={item}
                className="line-clamp-1"
              >
                {item}
              </Link>
            ))}
          </div>
        </Descriptions.Item>

        <Descriptions.Item label="Hình ảnh" span={3}>
          <div className="grid grid-cols-3 gap-2">
            <Image.PreviewGroup>
              {imageOrders.map((url) => (
                <Image src={url} key={url} alt="hehe" />
              ))}
            </Image.PreviewGroup>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default function HistoryPage() {
  const { query } = useRouter();

  const { data, isLoading } = useGetOrderByGarageId(Number(query?.garageId));

  const [viewDetail, setViewDetail] = useState<GetOrderGarageData[number]>();

  const columns: ColumnsType<GetOrderGarageData[number]> = [
    { title: 'ID', render: (_, item) => item.orderID },
    { title: 'Tên chủ xe', render: (_, item) => item.name },
    { title: 'Số điện thoại', render: (_, item) => item.phoneNumber },
    { title: 'Loại xe', render: (_, item) => item.typeCar },
    { title: 'Hãng xe', render: (_, item) => item.brand },
    // { title: 'Biển số', render: (_, item) => item.licensePlates },
    { title: 'Loại dịch vụ', render: (_, item) => item.category.join(', ') },
    {
      title: 'Ngày',
      render: (_, item) => dayjs(item.timeAppointment).format('DD-MM-YYYY'),
    },
    {
      title: 'Giờ',
      render: (_, item) => dayjs(item.timeAppointment).format('hh:mm'),
    },
    {
      title: 'Hành động',
      render: (_, item) => (
        <Button
          className="rounded-full bg-green-500 text-white border-none hover:bg-green-500/60"
          onClick={() => setViewDetail(item)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Lịch sử sửa chữa</Typography.Title>

      <div>
        <Skeleton active loading={isLoading}>
          <Table
            columns={columns}
            dataSource={data?.filter((item) => item.status === 'done')}
          />
        </Skeleton>
      </div>

      <Modal
        open={!isUndefined(viewDetail)}
        footer={null}
        onCancel={() => setViewDetail(undefined)}
        width={800}
      >
        <ModalContent {...(viewDetail as GetOrderGarageData[number])} />
      </Modal>
    </div>
  );
}

HistoryPage.Layout = ManageGarageLayout;
