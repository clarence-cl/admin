const UPLOADTOKENCHEKEY = 'UPLOADTOKENCHEKEY';
const UPLOADTOKENEXPIRECHEKEY = 'UPLOADTOKENEXPIRECHEKEY';
export const UPLOADTOKEN = 'UPLOADTOKEN';
export const UPLOADTOKENEXPIRE = 'UPLOADTOKENEXPIRE';

export default {
  state: {
    token: localStorage.getItem(UPLOADTOKENCHEKEY) || '',
    expire: Number(localStorage.getItem(UPLOADTOKENEXPIRECHEKEY) || 0)
  },
  getters: {
    uploadToken: state => state.token,
    uploadTokenExpire: state => state.expire
  },
  mutations: {
    [UPLOADTOKEN](state, token) {
      state.token = token;
      localStorage.setItem(UPLOADTOKENCHEKEY, token);
    },
    [UPLOADTOKENEXPIRE](state, expire) {
      state.expire = expire;
      localStorage.setItem(UPLOADTOKENEXPIRECHEKEY, expire);
    }
  },
  actions: {
    [UPLOADTOKEN]({ commit }, token) {
      commit(UPLOADTOKEN, token);
    },
    [UPLOADTOKENEXPIRE]({ commit }, expire) {
      commit(UPLOADTOKENEXPIRE, expire);
    }
  },
};
