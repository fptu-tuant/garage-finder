import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';

type CarOwnerSignUpFormValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export function CarOwnerSignUpForm() {
  const [form] = Form.useForm<CarOwnerSignUpFormValues>();

  return (
    <Form form={form} className="max-w-md w-full">
      <Typography.Title className="mb-14" level={2}>
        Đăng ký
      </Typography.Title>

      <Form.Item name="fullName">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Họ tên"
          suffix={<UserOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="phone">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Số điện thoại"
          suffix={<PhoneOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="email">
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Email"
          suffix={<MailOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="password">
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      <Form.Item name="retypePassword">
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Nhập lại mật khẩu"
        />
      </Form.Item>

      <Form.Item className="mt-14">
        <Button
          className="w-full rounded-full shadow-md"
          size="large"
          type="primary"
        >
          Đăng Ký
        </Button>
      </Form.Item>
    </Form>
  );
}