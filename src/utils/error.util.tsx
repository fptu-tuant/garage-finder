import { notification } from 'antd';

import { CloseIcon } from '@/icons';

export function showError(error: unknown) {
  notification.error({ message: String(error), closeIcon: <CloseIcon /> });
}

export function showSuccess(message: string) {
  notification.success({ message, closeIcon: <CloseIcon /> });
}
