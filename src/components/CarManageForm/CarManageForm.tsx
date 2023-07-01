import { Button, Form, Input } from 'antd';
import { useState } from 'react';

import { useAddCarApi, useDeleteCarApi, useUpdateCarApi } from '@/api';
import { CarBrandSelect, SingleUploadDragger } from '@/components';
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
  formValues?: CarManageFormValues | Record<string, unknown>;
  onFinishCallApi?: () => void;
};

export function CarManageForm({
  formValues = {},
  onFinishCallApi,
}: CarManageFormProps) {
  const { carID = null, ...initValues } = formValues;
  const [form] = Form.useForm<CarManageFormValues>();

  const [isInEditMode, setInEditMode] = useState(false);

  const { mutate: updateCar, isLoading: updatingCar } = useUpdateCarApi({
    onSuccess: () => {
      showSuccess('Cập nhật thông tin xe thành công!');
      onFinishCallApi?.();
    },
    onError: showError,
  });

  const { mutate: deleteCar, isLoading: deletingCar } = useDeleteCarApi({
    carId: Number(carID),
    onSuccess: () => {
      showSuccess('Đã xóa xe!');
      onFinishCallApi?.();
    },
    onError: showError,
  });

  const { mutate: addCar, isLoading: addingCar } = useAddCarApi({
    onSuccess: () => {
      showSuccess('Thêm xe thành công!');
      onFinishCallApi?.();
    },
    onError: showError,
  });

  const isAddNew = !carID;

  return (
    <Form
      form={form}
      className="flex gap-8"
      initialValues={initValues}
      labelCol={{ span: 8 }}
      labelAlign="left"
      disabled={!isInEditMode && !isAddNew}
    >
      <div>
        <Form.Item name="avatar">
          <SingleUploadDragger
            className="aspect-video"
            disabled={!isInEditMode && !isAddNew}
          />
        </Form.Item>
      </div>

      <div className="min-w-[400px]">
        <Form.Item label="Hãng xe" name="brandID">
          <CarBrandSelect mode={undefined} />
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
              disabled={addingCar || false}
              loading={addingCar}
              onClick={() => {
                if (isAddNew) {
                  addCar({
                    body: form.getFieldsValue(),
                  });
                } else {
                  setInEditMode(true);
                }
              }}
            >
              {isAddNew ? 'Thêm xe' : 'Chỉnh sửa'}
            </Button>
          ) : (
            <div className="flex gap-6 justify-center">
              <Button
                type="primary"
                disabled={updatingCar}
                onClick={async () => {
                  updateCar({
                    body: { ...form.getFieldsValue(), carID: Number(carID) },
                  });
                }}
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
