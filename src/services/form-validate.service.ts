import { Rule } from 'antd/es/form';

export const required = (message?: string): Rule => ({
  required: true,
  message,
});

export const confirmPassword = (
  message = 'The two passwords that you entered do not match!'
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

export const email = (message = 'The input is not valid E-mail!s'): Rule => ({
  type: 'email',
  message,
});
