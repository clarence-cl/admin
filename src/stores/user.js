import Vue from 'vue';
import defaultAvatar from '../assets/images/admin.png';

export const USER_SIGNIN = 'USER_SIGNIN'; // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT'; // 退出登录

export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {
      head_pic: defaultAvatar,
      nickname: 'admin',
      role_name: ''
    }
  },
  getters: {
    user: state => {
      return state.user;
    }
  },
  mutations: {
    [USER_SIGNIN](state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    [USER_SIGNOUT](state) {
      localStorage.removeItem('user');
      state.user = {};
      window.location.reload();
    },
  },
  actions: {
    [USER_SIGNIN]({ commit }, user) {
      commit(USER_SIGNIN, user);
    },
    [USER_SIGNOUT]({ commit }) {
      commit(USER_SIGNOUT);
    },
  },
};
