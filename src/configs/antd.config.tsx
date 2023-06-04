import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { PropsWithChildren } from 'react';

const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    required: 'Không được để trống!',
    whitespace: 'Không được để trống!',
    string: {
      min: 'Trường này phải có ít nhất ${min} ký tự',
      max: 'Trường này phải có ít hơn ${max} ký tự',
    },
    types: {
      number: 'Trường này chỉ được nhập số',
    },
    pattern: {
      mismatch: 'Dữ liệu nhập vào không hợp lệ',
    },
  },
};

export function AntConfigProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      prefixCls="tl"
      form={formConfig}
      theme={{
        token: {
          colorPrimary: '#8A79EF',
          controlHeightSM: 32,
          controlHeight: 40,
          controlHeightLG: 48,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
