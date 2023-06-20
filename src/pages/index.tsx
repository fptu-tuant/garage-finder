import { Button, Cascader, Form, Input, Select, Typography } from 'antd';
import { Fragment } from 'react';

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
    <div className='bg-[#FAF8FC]'>
      <section className="grid grid-cols-5 min-h-[500px] ml-10">
        <div className="flex flex-col justify-center col-span-2">
          <Typography.Title className="uppercase text-slate-800 w-4/5 ml-10 mb-5">
            CÁCH NHANH CHÓNG VÀ DỄ DÀNG ĐỂ ĐẶT DỊCH VỤ chăm sóc xe hơi
          </Typography.Title>
          <Typography.Text className="text-slate-600 w-4/5 ml-10">
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
          <Form layout="vertical" className="flex justify-between gap-4">
            <Form.Item label="Garage" className="grow">
              <Input placeholder="Nhập tên garage" />
            </Form.Item>

            <Form.Item label="Địa điểm" className="grow">
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

            <Form.Item label="Loại dịch vụ" className="grow">
              <Select
                placeholder="Chọn loại dịch vụ"
                options={GARAGE_SERVICES}
              />
            </Form.Item>

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
      <section className="ml-auto mr-auto max-w-[1280px] mt-10 text-center">
        <h2 className="title text-3xl font-bold mb-10 ">Dịch vụ</h2>
        <div className="list-services grid grid-cols-2 gap-10">
          <div className="service-card bg-white shadow-2xl p-5 w-[600px] rounded-xl">
            <div className="flex">
              <div>
                <h3 className="text-2xl font-semibold mb-5">Sửa chữa</h3>
                <div className="content">
                  <p className="mb-3">
                    Dịch vụ sửa chữa ô tô là các thủ tục được thực hiện để sửa
                    hoặc phục hồi xe đang gặp sự cố, hư hỏng về máy móc.
                  </p>
                  <button className=" text-white mt-3 py-2 px-8 bg-purple-600 rounded-md border-none">
                    Chi tiết
                  </button>
                </div>
              </div>
              <img src="/repair.png" alt="hehe"></img>
            </div>
          </div>
          <div className="service-card bg-white shadow-2xl p-5 w-[600px] rounded-xl">
            <div className="flex">
              <div>
                <h3 className="text-2xl font-semibold mb-5">Tân Trang</h3>
                <div className="content">
                  <p className="mb-3">
                    Dịch vụ tân trang ô tô là một quy trình toàn diện nhằm phục
                    hồi một chiếc xe cũ hoặc bị hư hỏng về tình trạng gần như
                    nguyên bản.
                  </p>
                  <button className=" text-white mt-3 py-2 px-8 bg-purple-600 rounded-md border-none">
                    Chi tiết
                  </button>
                </div>
              </div>
              <img
                src="/refurbished.png"
                alt="hehe"
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>
          <div className="service-card bg-white shadow-2xl p-5 w-[600px] rounded-xl">
            <div className="flex">
              <div>
                <h3 className="text-2xl font-semibold mb-5">Bảo dưỡng</h3>
                <div className="content">
                  <p className="mb-3">
                    Dịch vụ bảo dưỡng ô tô là các quy trình định kỳ giúp giữ cho
                    xe hoạt động trơn tru và ngăn ngừa các vấn đề tiềm ẩn.
                  </p>
                  <button className=" text-white mt-3 py-2 px-8 bg-purple-600 rounded-md border-none">
                    Chi tiết
                  </button>
                </div>
              </div>
              <img
                src="/maintenance.png"
                alt="hehe"
                className="h-[170px] w-[200px]"
              ></img>
            </div>
          </div>
          <div className="service-card bg-white shadow-2xl p-5 w-[600px] rounded-xl">
            <div className="flex">
              <div>
                <h3 className="text-2xl font-semibold mb-5">Cứu hộ</h3>
                <div className="content">
                  <p className="mb-3">
                    Họ sẽ giúp, khắc phục nhanh chóng các trường hợp xe gặp sự
                    cố bất ngờ như hư xăm, xịt lốp, hư khóa, bị ngập xe trời
                    mưa, hư ắc quy, bị tai nạn….
                  </p>
                  <button className="text-white mt-3 py-2 px-8 bg-purple-600 rounded-md border-none">
                    Chi tiết
                  </button>
                </div>
              </div>
              <img
                src="/rescue.png"
                alt="hehe"
                className="w-[241px] h-[192px]"
              ></img>
            </div>
          </div>
        </div>
      </section>          

    </div>
  );
}
