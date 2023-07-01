import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, Input, Typography } from 'antd';

import { useCarOwnerRegisterApi } from '@/api';
import { confirmPasswordRule, emailRule, requiredRule } from '@/services';
import { showError, showSuccess } from '@/utils';

type SignUpFormValues = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

const StyledForm = styled(Form)`
  .tl-form-item-explain {
    padding-left: 1em;
  }

  .tl-form-item-control {
    margin-bottom: 6px;
  }
` as unknown as typeof Form<SignUpFormValues>;

export function SignUpForm() {
  const [form] = Form.useForm<SignUpFormValues>();

  const { mutate: signUp, isLoading } = useCarOwnerRegisterApi({
    onError: showError,
    onSuccess: () => {
      showSuccess('Đăng ký thành công!');
    },
  });

  const onFinish = (values: SignUpFormValues) => {
    const { email, fullName, password, phone } = values;

    signUp({
      body: {
        name: fullName,
        emailAddress: email,
        password,
        phoneNumber: phone,
        roleID: 0,
      },
    });
  };

  return (
    <StyledForm form={form} className="max-w-md w-full" onFinish={onFinish}>
      <Typography.Title className="mb-14" level={2}>
        Đăng ký
      </Typography.Title>

      <Form.Item name="fullName" rules={[requiredRule()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Họ tên"
          suffix={<UserOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="phone" rules={[requiredRule()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Số điện thoại"
          suffix={<PhoneOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="email" rules={[requiredRule(), emailRule()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Email"
          suffix={<MailOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="password" rules={[requiredRule()]}>
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[requiredRule(), confirmPasswordRule()]}
      >
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
          htmlType="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Đăng Ký
        </Button>
      </Form.Item>
    </StyledForm>
  );
}
