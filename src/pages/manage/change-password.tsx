import { Button, Form, Input, Layout, Typography } from 'antd';

import { useChangePassword } from '@/api';
import { UserDashboardSider } from '@/components';
import { confirmPasswordRule, requiredRule } from '@/services';
import { showSuccess } from '@/utils';

const { Sider, Content } = Layout;

export default function ChangePassword() {
  const [form] = Form.useForm();

  const { mutate: changePassword, isLoading, isError } = useChangePassword();

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10">
        <Typography.Title level={2} className="mt-0 pt-0 font-bold">
          Đổi mật khẩu
        </Typography.Title>

        <Form
          form={form}
          className="max-w-lg"
          labelCol={{ span: 9 }}
          labelAlign="left"
          onFinish={() => {
            const values = form.getFieldsValue();
            changePassword({ body: values });
            !isLoading && !isError && showSuccess('Đổi mật khẩu thành công');
          }}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[requiredRule()]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[requiredRule()]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="confirmNewPassword"
            rules={[
              requiredRule(),
              confirmPasswordRule(undefined, 'newPassword'),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              htmlType="submit"
              type="primary"
              disabled={isLoading}
              loading={isLoading}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
