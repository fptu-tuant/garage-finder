import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Cascader, Form, Input, Select, Tag, Typography } from 'antd';

import { CAR_COMPANIES, GARAGE_SERVICES, VIETNAM_PROVINCES } from '@/constants';
import { useStep } from '@/hooks';

type GarageOwnerSignUpFormValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
  retypePassword?: string;
  services?: string[];
  carCompanies?: string[];
  address?: number[];
};

const RoundedSelect = styled(Select)`
  .ant-select-selector,
  .ant-select-selection-item {
    border-radius: 999px !important;
  }
`;

const RoundedCascader = styled(Cascader)`
  .ant-select-selector {
    border-radius: 999px !important;
  }
`;

export function GarageOwnerSignUpForm() {
  const [currentStep, stepHelpers] = useStep(2);
  const [form] = Form.useForm<GarageOwnerSignUpFormValues>();

  const locationCascaderOptions = VIETNAM_PROVINCES.map((province) => ({
    label: province.name,
    value: province.code,
    children: province.districts.map((district) => ({
      label: district.name,
      value: district.code,
    })),
  }));

  return (
    <Form
      form={form}
      className="max-w-md w-full"
      onValuesChange={(changes) => console.log(changes)}
    >
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
          <Form.Item name="services">
            <RoundedSelect
              size="large"
              mode="multiple"
              maxTagCount={3}
              tagRender={(props) => (
                <Tag
                  {...props}
                  className="rounded-full flex h-8  bg-gray-200 items-center"
                >
                  {props.label}
                </Tag>
              )}
              className="rounded-full shadow-md"
              options={GARAGE_SERVICES}
              placeholder="Loại dịch vụ cung cấp"
            />
          </Form.Item>

          <Form.Item name="carCompanies">
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

          <Form.Item name="address">
            <RoundedCascader
              size="large"
              className="rounded-full"
              options={locationCascaderOptions}
              placeholder="Địa chỉ"
              showSearch={{
                filter: (inputValue, path) =>
                  path.some(
                    (option) =>
                      (option.label || '')
                        .toString()
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) > -1
                  ),
              }}
            />
          </Form.Item>

          <Form.Item name="detailAddress">
            <Input
              size="large"
              className="rounded-full"
              placeholder="Chi tiết địa chỉ"
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
