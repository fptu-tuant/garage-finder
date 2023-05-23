import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, Input, Select, Tag, Typography } from 'antd';

import { CAR_COMPANIES, GARAGE_SERVICES } from '@/constants';
import { useStep } from '@/hooks';

type GarageOwnerSignUpFormValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

const RoundedSelect = styled(Select)`
  .ant-select-selector,
  .ant-select-selection-item {
    border-radius: 999px !important;
  }
`;

export function GarageOwnerSignUpForm() {
  const [currentStep, stepHelpers] = useStep(2);
  const [form] = Form.useForm<GarageOwnerSignUpFormValues>();

  return (
    <Form form={form} className="max-w-md w-full">
      <Typography.Title className="mb-14" level={2}>
        Đăng ký
      </Typography.Title>

      {currentStep === 1 && (
        <>
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
        </>
      )}

      {currentStep === 2 && (
        <>
          <Form.Item name="service">
            <RoundedSelect
              size="large"
              mode="multiple"
              maxTagCount={3}
              className="rounded-full shadow-md"
              options={GARAGE_SERVICES}
              placeholder="Loại dịch vụ cung cấp"
            />
          </Form.Item>

          <Form.Item name="carCompany">
            <RoundedSelect
              size="large"
              maxTagCount={3}
              mode="multiple"
              tagRender={(props) => (
                <Tag {...props} className="rounded-full flex">
                  {props.label}
                </Tag>
              )}
              className="rounded-full shadow-md"
              options={CAR_COMPANIES.map(({ icon: Icon, label, value }) => ({
                label: (
                  <div className="flex items-center gap-2">
                    <Icon className="text-4xl" /> <span>{label}</span>
                  </div>
                ),
                value,
              }))}
              placeholder="Hãng xe sửa chữa"
            />
          </Form.Item>
        </>
      )}

      <Form.Item className="mt-14">
        <Button
          className="w-full rounded-full shadow-md"
          size="large"
          type="primary"
          onClick={() => {
            currentStep === 1 && stepHelpers.next();
          }}
        >
          {currentStep === 1 ? 'Tiếp theo' : 'Đăng ký'}
        </Button>
      </Form.Item>
    </Form>
  );
}
