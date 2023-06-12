import { Rule } from 'antd/es/form';

export const required = (message?: string): Rule => ({
  required: true,
  message,
});

export const confirmPassword = (
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

export const email = (message = 'Không đúng định dạng email'): Rule => ({
  type: 'email',
  message,
});
