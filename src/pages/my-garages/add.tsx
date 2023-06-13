import { PhoneOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Typography } from 'antd';

import { UserIcon } from '@/icons';
import { required } from '@/services';

type AddGarageFormValues = {
  hello: 'world';
};

export default function AddGaragePage() {
  return (
    <div>
      <Typography.Title level={3} className="text-center">
        Đăng ký Garage
      </Typography.Title>

      <Form className="grid grid-cols-2 gap-10 w-4/5 mx-auto">
        <div>
          <Form.Item name="name" rules={[required()]}>
            <Input
              placeholder="Tên Garage"
              className="rounded-full shadow-md"
              suffix={<UserIcon className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item name="phone" rules={[required()]}>
            <Input
              placeholder="Số điện thoại"
              className="rounded-full shadow-md"
              suffix={<PhoneOutlined className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item name="email">
            <Input
              placeholder="Email"
              className="rounded-full shadow-md"
              suffix={<PhoneOutlined className="text-neutral-500" />}
            />
          </Form.Item>

          <Form.Item name="openTime">
            <DatePicker.RangePicker
              className="w-full rounded-full shadow-md"
              picker="time"
              placeholder={['Giờ mở cửa', 'Giờ đóng cửa']}
              format="hh:mm"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item>
            <Input placeholder="Tên Garage" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
