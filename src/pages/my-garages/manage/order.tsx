import {
  Button,
  Descriptions,
  Form,
  Input,
  Modal,
  Radio,
  Spin,
  Table,
  Tag,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { capitalize, isUndefined, lowerCase } from 'lodash-es';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  GetOrderGarageData,
  useChangeOrderStatus,
  useGetOrderByGarageId,
} from '@/api';
import { MultipleUpload } from '@/components';
import { ManageGarageLayout } from '@/layouts';
import { requiredRule } from '@/services';

function ModalContent({
  brand,
  name,
  phoneNumber,
  typeCar,
  licensePlates,
  color,
  onSubmit,
}: GetOrderGarageData[number] & { onSubmit: (value: any) => void }) {
  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Tên khách hàng">{name}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Hãng xe">{brand}</Descriptions.Item>
        <Descriptions.Item label="Dòng xe">{typeCar}</Descriptions.Item>
        <Descriptions.Item label="Biển số">{licensePlates}</Descriptions.Item>
        <Descriptions.Item label="Màu sắc">{color}</Descriptions.Item>
        <Descriptions.Item label="Ngày hoàn thành">
          {dayjs().format('DD/MM/YYYY')}
        </Descriptions.Item>
      </Descriptions>

      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Chi tiết dịch vụ"
          name="content"
          rules={[requiredRule()]}
        >
          <Input.TextArea />
        </Form.Item>

        <div className="grid grid-cols-2 gap-6">
          <Form.Item
            name="fileLinks"
            label="Tệp đính kèm"
            rules={[requiredRule()]}
          >
            <MultipleUpload />
          </Form.Item>

          <Form.Item
            name="imageLinks"
            label="Hình ảnh"
            rules={[requiredRule()]}
          >
            <MultipleUpload />
          </Form.Item>
        </div>

        <div className="mt-4 text-center">
          <Button htmlType="submit" type="primary">
            Hoàn thành
          </Button>
        </div>
      </Form>
    </>
  );
}

export default function ManageGarageOrderPage() {
  const { query } = useRouter();

  const [status, setStatus] = useState('all');
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useGetOrderByGarageId(
    Number(query?.garageId)
  );

  const { approve, reject, done, cancel } = useChangeOrderStatus({
    onSuccess: () => refetch(),
  });

  const filteredData = data
    ?.filter((item) => (status === 'all' ? true : item.status === status))
    ?.filter((item) => item.status !== 'done');

  const [doneDetail, setDoneDetail] = useState<GetOrderGarageData[number]>();

  const columns: ColumnsType<GetOrderGarageData[number]> = [
    { title: 'ID', render: (_, item) => item.orderID },
    { title: 'Tên chủ xe', render: (_, item) => item.name },
    { title: 'Số điện thoại', render: (_, item) => item.phoneNumber },
    { title: 'Loại xe', render: (_, item) => item.typeCar },
    { title: 'Hãng xe', render: (_, item) => item.brand },
    { title: 'Biển số', render: (_, item) => item.licensePlates },
    { title: 'Loại dịch vụ', render: (_, item) => item.category.join(', ') },
    {
      title: 'Thời gian',
      render: (_, item) =>
        dayjs(item.timeAppointment).format('DD-MM-YYYY hh:mm'),
    },
    {
      title: 'Trạng thái',
      render: (_, item) => (
        <Tag
          color={(() => {
            switch (item.status) {
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
                break;
            }
          })()}
          className="rounded-full"
        >
          {capitalize(item.status)}
        </Tag>
      ),
      align: 'center',
    },
    {
      title: 'Hành động',
      render: (_, item) => (
        <div className="flex gap-4">
          {lowerCase(item.status) === 'open' && (
            <Button
              className="bg-green-500 hover:bg-green-500/70 border-none text-white rounded-full"
              onClick={() => {
                approve.mutateAsync({ id: item.gfOrderID });
                setCurrentOrderId(item.gfOrderID);
              }}
              disabled={approve.isLoading || reject.isLoading}
              loading={approve.isLoading && currentOrderId === item.gfOrderID}
            >
              Xác nhận
            </Button>
          )}

          {lowerCase(item.status) === 'open' && (
            <Button
              className="bg-red-500 hover:bg-red-500/70 border-none text-white rounded-full"
              onClick={() => {
                reject.mutateAsync({ id: item.gfOrderID });
                setCurrentOrderId(item.gfOrderID);
              }}
              disabled={approve.isLoading || reject.isLoading}
              loading={reject.isLoading && currentOrderId === item.gfOrderID}
            >
              Từ chối
            </Button>
          )}

          {lowerCase(item.status) === 'confirmed' && (
            <Button
              className="bg-red-500 hover:bg-red-500/70 border-none text-white rounded-full"
              onClick={() => {
                cancel.mutateAsync({ id: item.gfOrderID });
                setCurrentOrderId(item.gfOrderID);
              }}
              disabled={cancel.isLoading}
              loading={cancel.isLoading && currentOrderId === item.gfOrderID}
            >
              Hủy lịch
            </Button>
          )}

          {lowerCase(item.status) === 'confirmed' && (
            <Button
              className="bg-green-500 hover:bg-green-500/70 border-none text-white rounded-full"
              onClick={() => {
                setDoneDetail(item);
              }}
              disabled={approve.isLoading || reject.isLoading}
              loading={approve.isLoading && currentOrderId === item.gfOrderID}
            >
              Hoàn thành
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Quản lý lịch đặt</Typography.Title>
      <div className="flex justify-end mb-4">
        <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
          <Radio.Button value="all">Tất cả</Radio.Button>
          <Radio.Button value="open" className="text-orange-500">
            Chờ xác nhận
          </Radio.Button>
          <Radio.Button value="confirmed" className="text-green-500">
            Đã xác nhận
          </Radio.Button>
          <Radio.Button value="reject" className="text-red-500">
            Đã từ chối
          </Radio.Button>
          <Radio.Button value="canceled" className="text-gray-500">
            Đã hủy
          </Radio.Button>
          {/* <Radio.Button value="done" className="text-cyan-500">
            Đã hoàn thành
          </Radio.Button> */}
        </Radio.Group>
      </div>
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={filteredData} />
      </Spin>

      <Modal
        open={!isUndefined(doneDetail)}
        title="Chi tiết sử dụng dịch vụ"
        onCancel={() => setDoneDetail(undefined)}
        destroyOnClose
        width={800}
        footer={null}
      >
        <ModalContent
          onSubmit={async (values) => {
            {
              await done.mutateAsync({
                body: { ...values, gfOrderId: doneDetail?.gfOrderID },
              });
              setDoneDetail(undefined);
            }
          }}
          {...(doneDetail as GetOrderGarageData[number])}
        />
      </Modal>
    </div>
  );
}

ManageGarageOrderPage.Layout = ManageGarageLayout;
