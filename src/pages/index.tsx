import { Button, Cascader, Form, Input, Select, Typography } from 'antd';

import { CarIllustrate } from '@/components';
import { GARAGE_SERVICES, VIETNAM_PROVINCES } from '@/constants';

export default function HomePage() {
  const locationCascaderOptions = VIETNAM_PROVINCES.map((province) => ({
    label: province.name,
    value: province.code,
    children: province.districts.map((district) => ({
      label: district.name,
      value: district.code,
    })),
  }));

  return (
    <>
      <section className="grid grid-cols-5 min-h-[500px]">
        <div className="flex flex-col justify-center col-span-2">
          <Typography.Title className="uppercase text-slate-800 w-4/5">
            CÁCH NHANH CHÓNG VÀ DỄ DÀNG ĐỂ ĐẶT DỊCH VỤ chăm sóc xe hơi
          </Typography.Title>
          <Typography.Text className="text-slate-600 w-4/5">
            Chào mừng bạn đến với Garage Finder ! Chúng tôi hiểu rằng chiếc xe
            của bạn là một phần quan trọng trong cuộc sống của bạn và chúng tôi
            ở đây để đảm bảo rằng nó vận hành trơn tru.
          </Typography.Text>
        </div>
        <div style={{ transform: 'rotateY(180deg)' }} className="col-span-3">
          <CarIllustrate />
        </div>
      </section>

      <section className="px-6">
        <div className="rounded-lg shadow-lg p-10 -translate-y-4 bg-white border">
          <Form layout="inline" className="flex justify-between">
            <Form layout="vertical" className="grow">
              <Form.Item label="Garage">
                <Input placeholder="Nhập tên garage" />
              </Form.Item>
            </Form>

            <Form layout="vertical" className="grow">
              <Form.Item label="Địa điểm">
                <Cascader
                  options={locationCascaderOptions}
                  placeholder="Tỉnh  / Thành phố - Quận / Huyện"
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
            </Form>

            <Form layout="vertical" className="grow">
              <Form.Item label="Loại dịch vụ">
                <Select
                  placeholder="Chọn loại dịch vụ"
                  options={GARAGE_SERVICES}
                />
              </Form.Item>
            </Form>

            <Form.Item className="flex items-end">
              <Button htmlType="submit" type="primary">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>

      <section className="mt-20">
        <Typography.Title level={2} className="text-center">
          Đề xuất cho bạn
        </Typography.Title>
      </section>
    </>
  );
}
