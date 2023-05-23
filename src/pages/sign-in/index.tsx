import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import otoImage from '@/assets/images/5.png';

type SignInFormProps = Partial<{
  username: string;
  password: string;
}>;

export default function LoginPage() {
  const [form] = Form.useForm<SignInFormProps>();

  return (
    <div className="flex mt-20">
      <div className="relative w-3/5 px-8 min-h-[500px]">
        <div className="absolute w-2/3 bg-primary-100 h-full" />
        <div className="absolute w-full h-4/5 top-[10%]">
          <Image src={otoImage} alt="oto" fill className="object-contain" />
        </div>
      </div>
      <div className="w-2/5 px-5">
        <Form form={form} className="max-w-md">
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
