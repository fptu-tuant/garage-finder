import { ConfigProvider, notification } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { createContext, PropsWithChildren, useMemo } from 'react';

const formConfig: ConfigProviderProps['form'] = {
  validateMessages: {
    required: '${label} is a required field!',
    whitespace: ' ${label} cannot be empty!',
    string: {
      min: '${label} must be minimum ${min} characters!',
      max: '${label} must be maximum ${max} characters!',
    },
    types: {
      number: '${label} must be number!',
    },
    pattern: {
      mismatch: '${label} is not valid!',
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
