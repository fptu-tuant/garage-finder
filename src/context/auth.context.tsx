import { ACCESS_TOKEN_KEY } from '@/constants';
import { Maybe, User } from '@/types';
import { makeContext } from '@/utils/context-builder.util';

type AuthStore = {
  user: Maybe<User>;
};

type Action =
  | {
      type: 'SIGN_IN';
      payload: { user: User; accessToken: string };
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
  // TODO: request api getMe & implement when user already login

  return { user: null };
}

export const [AuthProvider, useAuthStore] = makeContext({
  name: 'Auth',
  initial: initialAuthStore,
  reducer,
});
