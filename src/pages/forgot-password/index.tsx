import { NumberOutlined, PhoneFilled } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

import { useForgotPasswordApi, useSendVerifyCode } from '@/api';
import { CarIllustrate } from '@/components';
import { confirmPasswordRule, requiredRule } from '@/services';
import { showError, showSuccess } from '@/utils';

type FormForgotPasswordValues = {
  phone: string;
  verifyCode: string;
  password: string;
};

export default function ForgotPasswordPage() {
  const [form] = Form.useForm<FormForgotPasswordValues>();

  const [hadSendCode, setSendCode] = useState(false);

  const { mutate: sendCode, isLoading: sendingCode } = useSendVerifyCode({
    onSuccess: () => {
      setSendCode(true);
      showSuccess('Mã xác thực đã được gửi!');
    },
    onError: showError,
  });

  const { mutate: requestChangePassword, isLoading: requesting } =
    useForgotPasswordApi({
      onSuccess: () => showSuccess('Mật khẩu đã được thay đổi'),
      onError: showError,
    });

  const onFinish = () => {
    const { password, phone, verifyCode } = form.getFieldsValue();

    requestChangePassword({
      body: { newPassword: password, phoneNumber: phone, verifyCode },
    });
  };

  return (
    <div className="flex my-20">
      <div className="relative w-3/5 min-h-[500px]">
        <CarIllustrate />
      </div>
      <div className="w-2/5 px-5 flex flex-col items-center justify-center">
        <Typography.Title level={3} className="mb-6">
          Quên mật khẩu
        </Typography.Title>
        <p className="mb-8">
          Đừng lo ! Mã OTP sẽ được gửi đến số điện thoại của bạn.
        </p>

        <Form form={form} onFinish={onFinish} className="w-full max-w-lg">
          <div className="flex gap-2">
            <Form.Item name="phone" rules={[requiredRule()]} className="w-full">
              <Input
                size="large"
                placeholder="Nhập số điện thoại"
                className="rounded-full shadow-md"
                suffix={<PhoneFilled className="text-neutral-500" />}
              />
            </Form.Item>

            <Button
              size="large"
              type="default"
              loading={sendingCode}
              disabled={sendingCode}
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => {
                const { phone } = form.getFieldsValue();

                sendCode({ body: phone });
              }}
            >
              Nhận mã
            </Button>
          </div>

          {hadSendCode && (
            <>
              <Form.Item name="verifyCode">
                <Input
                  size="large"
                  placeholder="Mã xác nhận"
                  className="rounded-full shadow-md"
                  suffix={<NumberOutlined className="text-neutral-500" />}
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="rounded-full w-full"
                  loading={requesting}
                  disabled={requesting}
                >
                  Lấy lại mật khẩu
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
