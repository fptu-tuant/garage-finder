import {
  Button,
  Cascader,
  Form,
  Input,
  Layout,
  Skeleton,
  Typography,
} from 'antd';
import { useState } from 'react';

import { useGetMe, useUpdateUserApi } from '@/api';
import { SingleUploadDragger, UserDashboardSider } from '@/components';
import { LOCATION_CASCADER_OPTIONS } from '@/constants';
import { required } from '@/services';
import { showError, showSuccess } from '@/utils';

const { Sider, Content } = Layout;

type UserFormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: [number | undefined, number | undefined];
  detailAddress: string;
  avatar: string;
};

export default function MyInfoPage() {
  const [form] = Form.useForm<UserFormValues>();

  const [isInEditMode, setIsInEditMode] = useState(false);

  const { data: user, isLoading } = useGetMe();
  const { mutate: updateUser, isLoading: updating } = useUpdateUserApi({
    onSuccess: () => showSuccess('Cập nhật thông tin thành công'),
    onError: showError,
  });

  const initFormValues: Partial<UserFormValues> = {
    address: [user?.provinceId, user?.districtId],
    detailAddress: user?.addressDetail,
    email: user?.emailAddress,
    fullName: user?.name,
    phone: user?.phoneNumber,
    avatar: user?.linkImage || undefined,
  };

  const onEnableEdit = () => setIsInEditMode(true);

  const onUpdateInfo = async () => {
    const { email, fullName, phone, avatar, address, detailAddress } =
      form.getFieldsValue();

    console.log({ address, detailAddress });

    updateUser({
      body: {
        emailAddress: email,
        linkImage: avatar,
        name: fullName,
        phoneNumber: phone,
        provinceId: address[0] || NaN,
        districtId: address[1] || NaN,
        addressDetail: detailAddress,
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
          <div className="flex gap-2">
            <Typography.Title level={2} className="mt-0 pt-0 font-bold">
              Thông tin của tôi
            </Typography.Title>
          </div>
          <p>Quản lý thông tin thông tin để bảo mật tài khoản</p>

          <Form
            form={form}
            initialValues={initFormValues}
            className="flex gap-10 mt-4"
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={onUpdateInfo}
            disabled={!isInEditMode}
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
                name="detailAddress"
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
                    disabled={false}
                    onClick={(e) => {
                      e.preventDefault();
                      onEnableEdit();
                    }}
                  >
                    Sửa thông tin
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Form.Item name="avatar">
                <SingleUploadDragger
                  disabled={!isInEditMode}
                  folder={`users/${user?.userID}/images`}
                />
              </Form.Item>
            </div>
          </Form>
        </Skeleton>
      </Content>
    </Layout>
  );
}
