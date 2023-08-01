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
      payload: {
        user: User;
        accessToken: string;
        refreshToken: string;
        role?: 'USER' | 'STAFF';
      };
    }
  | { type: 'SIGN_OUT' }
  | {
      type: 'UPDATE_AVATAR';
      payload: {
        linkImage: string;
      };
    };

function reducer(state: AuthStore, action: Action): AuthStore {
  switch (action.type) {
    case 'SIGN_IN': {
      const { accessToken, user } = action.payload;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      return { ...state, user };
    }

    case 'SIGN_OUT': {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem('ROLE');

      return { ...state, user: null };
    }

    case 'UPDATE_AVATAR': {
      const { linkImage } = action.payload;

      return {
        ...state,
        user: { ...(state.user ?? ({} as User)), avatar: linkImage },
      };
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
      userID: number;
      phoneNumber: string;
      emailAddress: string;
      name: string;
      linkImage: string | null;
      accessToken: string;
    }>({
      method: 'GET',
      url: '/api/User/get',
    });

    dispatch({
      type: 'SIGN_IN',
      payload: {
        user: {
          accessToken: data.accessToken,
          id: data.userID,
          email: data.emailAddress,
          fullName: data.name,
          phone: data.phoneNumber,
          avatar: data.linkImage,
          role: 'USER',
        },
        accessToken: ACCESS_TOKEN,
        refreshToken: '',
      },
    });
  } catch (error) {
    try {
      const { data } = await api<{
        useID: number;
        phoneNumber: string;
        emailAddress: string;
        name: string;
        linkImage: string | null;
        accessToken: string;
      }>({
        method: 'POST',
        url: '/api/Staff/getMyStaffInfor',
      });

      dispatch({
        type: 'SIGN_IN',
        payload: {
          user: {
            accessToken: data.accessToken,
            id: data.useID,
            email: data.emailAddress,
            fullName: data.name,
            phone: data.phoneNumber,
            avatar: data.linkImage,
            role: 'STAFF',
          },
          accessToken: ACCESS_TOKEN,
          refreshToken: '',
        },
      });
    } catch (error) {
      console.error(error);
      // showError(error);
    }

    console.error(error);
    // showError(error);
  }
}

export const [AuthProvider, useAuthStore] = makeContext({
  name: 'Auth',
  initial: initialAuthStore,
  reducer,
  initOnMounted,
});
