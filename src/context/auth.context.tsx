import { Dispatch } from 'react';

import { ACCESS_TOKEN_KEY } from '@/constants';
import { Maybe, User } from '@/types';
import { api } from '@/utils';
import { makeContext } from '@/utils/context-builder.util';

type AuthStore = {
  user: Maybe<User>;
};

type Action =
  | {
      type: 'SIGN_IN';
      payload: { user: User; accessToken: string; refreshToken: string };
    }
  | { type: 'SIGN_OUT' };

function reducer(state: AuthStore, action: Action): AuthStore {
  switch (action.type) {
    case 'SIGN_IN': {
      const { accessToken, user } = action.payload;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      return { ...state, user };
    }

    case 'SIGN_OUT': {
      localStorage.removeItem(ACCESS_TOKEN_KEY);

      return { ...state, user: null };
    }
  }
}

function initialAuthStore(): AuthStore {
  return { user: null };
}

async function initOnMounted(state: AuthStore, dispatch: Dispatch<Action>) {
  const ACCESS_TOKEN = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!ACCESS_TOKEN) return;

  try {
    const { data } = await api<{
      phoneNumber: string;
      emailAddress: string;
      name: string;
      linkImage: string | null;
    }>({
      method: 'GET',
      url: '/api/User/get',
    });

    dispatch({
      type: 'SIGN_IN',
      payload: {
        user: {
          email: data.emailAddress,
          fullName: data.name,
          phone: data.phoneNumber,
          avatar: data.linkImage,
        },
        accessToken: ACCESS_TOKEN,
        refreshToken: '',
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export const [AuthProvider, useAuthStore] = makeContext({
  name: 'Auth',
  initial: initialAuthStore,
  reducer,
  initOnMounted,
});
