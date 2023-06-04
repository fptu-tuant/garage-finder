import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, Input, Typography } from 'antd';

import { useCarOwnerRegisterApi } from '@/api';
import { USER_ROLE } from '@/constants';
import { confirmPassword, email, required } from '@/services';
import { showError, showSuccess } from '@/utils';

type CarOwnerSignUpFormValues = {
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
` as unknown as typeof Form<CarOwnerSignUpFormValues>;

export function CarOwnerSignUpForm() {
  const [form] = Form.useForm<CarOwnerSignUpFormValues>();

  const { mutate: signUp, isLoading } = useCarOwnerRegisterApi({
    onError: showError,
    onSuccess: () => {
      showSuccess('Đăng ký thành công!');
    },
  });

  const onFinish = (values: CarOwnerSignUpFormValues) => {
    const { email, fullName, password, phone } = values;

    signUp({
      body: {
        name: fullName,
        emailAddress: email,
        password,
        phoneNumber: phone,
        roleID: USER_ROLE.CarOwner,
      },
    });
  };

  return (
    <StyledForm form={form} className="max-w-md w-full" onFinish={onFinish}>
      <Typography.Title className="mb-14" level={2}>
        Đăng ký
      </Typography.Title>

      <Form.Item name="fullName" rules={[required()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Họ tên"
          suffix={<UserOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="phone" rules={[required()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Số điện thoại"
          suffix={<PhoneOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="email" rules={[required(), email()]}>
        <Input
          size="large"
          className="rounded-full shadow-md"
          placeholder="Email"
          suffix={<MailOutlined className="text-slate-400" />}
        />
      </Form.Item>

      <Form.Item name="password" rules={[required()]}>
        <Input.Password
          size="large"
          className="rounded-full shadow-md"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      <Form.Item name="confirmPassword" rules={[required(), confirmPassword()]}>
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
