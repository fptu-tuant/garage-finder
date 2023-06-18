import { Form, Layout, Typography } from 'antd';

import { UserDashboardSider } from '@/components';

const { Sider, Content } = Layout;

export default function MyCarsPage() {
  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10">
        <div className="flex gap-2">
          <Typography.Title level={2} className="mt-0 pt-0 font-bold">
            Xe của tôi
          </Typography.Title>
        </div>
        <p>Thêm xe trước khi thực hiện đặt lịch</p>

        <Form></Form>
      </Content>
    </Layout>
  );
}
