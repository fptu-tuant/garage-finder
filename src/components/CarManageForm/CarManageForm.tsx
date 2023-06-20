import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';

import { useDeleteCarApi, useUpdateCarApi } from '@/api';
import { SingleUploadDragger } from '@/components';
import { CAR_COMPANIES } from '@/constants';
import { showError, showSuccess } from '@/utils';

type CarManageFormValues = {
  carID: number;
  licensePlates: string;
  brandID: number;
  color: string;
  typeCar: string;
  avatar: string;
};

type CarManageFormProps = {
  formValues: CarManageFormValues;
};

export function CarManageForm({ formValues }: CarManageFormProps) {
  const { carID, ...initValues } = formValues;
  const [form] = Form.useForm<CarManageFormValues>();

  const [isInEditMode, setInEditMode] = useState(false);

  const { mutate: updateCar, isLoading: updatingCar } = useUpdateCarApi({
    onSuccess: () => showSuccess('Cập nhật thông tin xe thành công!'),
    onError: showError,
  });

  const { mutate: deleteCar, isLoading: deletingCar } = useDeleteCarApi({
    carId: carID,
  });

  return (
    <Form
      form={form}
      className="flex gap-8"
      initialValues={initValues}
      labelCol={{ span: 8 }}
      labelAlign="left"
      disabled={!isInEditMode}
    >
      <div>
        <Form.Item name="avatar">
          <SingleUploadDragger className="aspect-video" />
        </Form.Item>
      </div>

      <div className="min-w-[400px]">
        <Form.Item label="Hãng xe" name="brandID">
          <Select options={CAR_COMPANIES} />
        </Form.Item>

        <Form.Item label="Màu xe" name="color">
          <Input />
        </Form.Item>

        <Form.Item label="Dòng xe" name="typeCar">
          <Input />
        </Form.Item>

        <Form.Item label="Biển số" name="licensePlates">
          <Input />
        </Form.Item>

        <div className="text-center">
          {!isInEditMode ? (
            <Button
              type="primary"
              disabled={false}
              onClick={() => setInEditMode(true)}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-6 justify-center">
              <Button
                type="primary"
                disabled={updatingCar}
                onClick={async () =>
                  updateCar({
                    body: { ...form.getFieldsValue(), carID },
                  })
                }
              >
                Cập nhật
              </Button>
              <Button
                type="primary"
                className="bg-red-500 hover:bg-red-500/70"
                onClick={() => deleteCar({})}
                disabled={deletingCar}
                loading={deletingCar}
              >
                Xóa xe
              </Button>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}
