import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';

import { AuthIllustrate } from '@/components';

type SignInFormProps = Partial<{
  username: string;
  password: string;
}>;

export default function LoginPage() {
  const [form] = Form.useForm<SignInFormProps>();

  return (
    <div className="flex mt-20 px-20">
      <div className="relative w-3/5 min-h-[500px]">
        <AuthIllustrate />
      </div>
      <div className="w-2/5 px-5 flex justify-center">
        <Form form={form} className="max-w-md w-full">
          <Typography.Title className="mb-14" level={2}>
            Đăng nhập
          </Typography.Title>

          <Form.Item name="username">
            <Input
              size="large"
              className="rounded-full shadow-md"
              placeholder="Email"
              suffix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item name="password">
            <Input
              size="large"
              className="rounded-full shadow-md"
              placeholder="Mật khẩu"
              suffix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item className="mt-14">
            <Button
              className="w-full rounded-full shadow-md"
              size="large"
              type="primary"
            >
              Đăng Nhập
            </Button>
          </Form.Item>

          <Typography className="text-center">
            <span>Bạn chưa có tài khoản ?</span>{' '}
            <Link href="/sign-up" className="text-primary font-semibold">
              Đăng ký
            </Link>
          </Typography>
        </Form>
      </div>
    </div>
  );
}
