import { Rule } from 'antd/es/form';

import { REGEX_VIETNAM_PHONE } from '@/constants';

export const requiredRule = (message?: string): Rule => ({
  required: true,
  message,
});

export const confirmPasswordRule = (
  message = 'Nhập lại mật khẩu chưa khớp!'
): Rule => {
  return ({ getFieldValue }) => ({
    validator: async (_, value) => {
      if (!value || getFieldValue('password') === value) {
        return;
      }

      throw new Error(message);
    },
  });
};

export const emailRule = (message = 'Không đúng định dạng email'): Rule => ({
  type: 'email',
  message,
});

export const phoneRule = (
  message = 'Không đúng định dạng số điện thoại'
): Rule => ({
  message,
  pattern: new RegExp(REGEX_VIETNAM_PHONE),
});
