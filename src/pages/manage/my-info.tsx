import {
  Button,
  Cascader,
  Form,
  Input,
  Layout,
  Skeleton,
  Typography,
  Upload,
} from 'antd';
import { useState } from 'react';

import { useGetMe, useUpdateUserApi } from '@/api';
import { UploadDragger, UserDashboardSider } from '@/components';
import { LOCATION_CASCADER_OPTIONS } from '@/constants';
import { required } from '@/services';
import { showError, showSuccess } from '@/utils';

const { Sider, Content } = Layout;

type UserFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: [number, number];
  detailAddress: string;
};

export default function MyInfoPage() {
  const [form] = Form.useForm<UserFormValues>();

  const [isInEditMode, setIsInEditMode] = useState(false);

  const { data: user, isLoading } = useGetMe();
  const { mutate: updateUser, isLoading: updating } = useUpdateUserApi({
    onSuccess: () => showSuccess('Cập nhật thông tin thành công'),
    onError: showError,
  });

  if (!user) {
    return 'error';
  }

  const initFormValues: UserFormValues = {
    address: [1, 2],
    detailAddress: '',
    email: user.emailAddress,
    fullName: user.name,
    phone: user.phoneNumber,
  };

  const onEnableEdit = () => setIsInEditMode(true);

  const onUpdateInfo = async () => {
    const { email, fullName, phone } = form.getFieldsValue();

    updateUser({
      body: {
        emailAddress: email,
        linkImage: '',
        name: fullName,
        password: user.password || '',
        phoneNumber: phone,
      },
    });

    setIsInEditMode(false);
  };

  return (
    <Layout hasSider className="bg-transparent mt-20">
      <Sider className="text-center bg-transparent">
        <UserDashboardSider />
      </Sider>
      <Content className="flex flex-col pr-6 pl-10">
        <Skeleton active loading={isLoading}>
          <Typography.Title level={2} className="mt-0 pt-0 font-bold">
            Thông tin của tôi
          </Typography.Title>
          <p>Quản lý thông tin thông tin để bảo mật tài khoản</p>

          <Form
            form={form}
            initialValues={initFormValues}
            className="flex gap-10 mt-4"
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={onUpdateInfo}
          >
            <div className="shrink-0 min-w-[620px]">
              <Form.Item label="Tên" name="fullName" rules={[required()]}>
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[required()]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[required()]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="address" rules={[required()]} label="Địa chỉ">
                <Cascader
                  size="large"
                  options={LOCATION_CASCADER_OPTIONS}
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

              <Form.Item
                label="Chi tiết địa chỉ"
                name="addressDetail"
                rules={[required()]}
              >
                <Input />
              </Form.Item>

              <div className="text-center">
                {isInEditMode ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="min-w-[150px]"
                    disabled={updating}
                    loading={updating}
                  >
                    Lưu
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onEnableEdit();
                    }}
                    className="min-w-[150px]"
                  >
                    Sửa thông tin
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Form.Item name="avatar">
                <UploadDragger />
              </Form.Item>
            </div>
          </Form>
        </Skeleton>
      </Content>
    </Layout>
  );
}
