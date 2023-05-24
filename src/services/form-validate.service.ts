import { Rule } from 'antd/es/form';

export const required = (message?: string): Rule => ({
  required: true,
  message,
});
