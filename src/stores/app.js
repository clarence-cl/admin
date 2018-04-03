export const TITLE_UPDATE = 'TITLE_UPDATE'; // 更新标题
export const SUB_TITLE_UPDATE = 'SUB_TITLE_UPDATE'; // 更新标题
export const APPMENU = 'APPMENU'; // 左侧菜单
export const APPPERMISSIONS = 'APPPERMISSIONS'; // 系统权限列表
export const INDEXPERMISSIONS = 'INDEXPERMISSIONS'; // 首页权限列表
export const DEFAULTINDEX = 'DEFAULTINDEX'; // 默认首页

export default {
  state: {
    title: '首页',
    subtitle: '',
    menu: [],
    permissions: [],
    indexPermissions: [],
    defaultIndexPath: '/index'
  },
  getters: {
    title: state => state.title,
    subtitle: state => state.subtitle,
    appmenu: state => state.menu,
    permissions: state => state.permissions,
    indexPermissions: state => state.indexPermissions,
    defaultIndexPath: state => state.defaultIndexPath
  },
  mutations: {
    [TITLE_UPDATE](state, title) {
      state.title = title;
    },
    [SUB_TITLE_UPDATE](state, title) {
      state.subtitle = title;
    },
    [APPMENU](state, menu) {
      state.menu = menu;
    },
    [APPPERMISSIONS](state, permissions) {
      state.permissions = permissions;
    },
    [INDEXPERMISSIONS](state, permissions) {
      state.indexPermissions = permissions;
    },
    [DEFAULTINDEX](state, path) {
      state.defaultIndexPath = path;
    }
  },
  actions: {
    [TITLE_UPDATE]({ commit }, title) {
      commit(TITLE_UPDATE, title);
    },
    [SUB_TITLE_UPDATE]({ commit }, title) {
      commit(SUB_TITLE_UPDATE, title);
    },
    [APPMENU]({ commit }, title) {
      commit(APPMENU, title);
    },
    [APPPERMISSIONS]({ commit }, permissions) {
      commit(APPPERMISSIONS, permissions);
    },
    [INDEXPERMISSIONS]({ commit }, permissions) {
      commit(INDEXPERMISSIONS, permissions);
    },
    [DEFAULTINDEX]({ commit }, path) {
      commit(DEFAULTINDEX, path);
    },
  },
};
