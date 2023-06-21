import { makeContext } from '@/utils/context-builder.util';

type Language = 'vi' | 'en';

type TranslateStore = {
  lang: Language;
};

type Action = {
  type: 'CHANGE_LANG';
  payload: { lang: Language };
};

function reducer(state: TranslateStore, action: Action) {
  switch (action.type) {
    case 'CHANGE_LANG': {
      const { lang } = action.payload;
      localStorage.setItem('LANG', lang);

      return { ...state, lang };
    }

    default:
      return state;
  }
}

const initTranslateStore: TranslateStore = {
  lang: 'vi',
};

export const [TranslateProvider, useTranslateStore] = makeContext({
  name: 'Translate',
  initial: initTranslateStore,
  reducer,
});
