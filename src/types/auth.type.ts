import { USER_ROLE } from '@/constants';

import { ObjectValues } from './base.type';

export type User = {
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type UserRole = ObjectValues<typeof USER_ROLE>;
