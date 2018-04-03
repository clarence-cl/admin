import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import stores from './stores';
import CONFIG from './utils/config';
import GLOBAL from './utils/global';

import {
  TITLE_UPDATE
} from './stores/app';
import {
  SUB_TITLE_UPDATE
} from './stores/app';
import {
  USER_SIGNOUT
} from './stores/user';

import common from '@/utils/common';
import md5 from 'js-md5';
import mock from './mock';
mock.setup({
  timeout: '300'
});

import VueHtml5Editor from 'vue-html5-editor';
import VueHighcharts from 'vue-highcharts';

import pic from '@/mixins/pic';

Vue.use(VueHtml5Editor, {
  showModuleName: true,
  language: "zh-cn",
  i18n: {
    //specify your language here
    "zh-cn": {
      "simsir-upload": "上传图片",
      "simsir-empty": "插入空格"
    }
  },
  visibleModules: [
    "text",
    "color",
    "font",
    "simsir-empty",
    "align",
    "list",
    "link",
    "unlink",
    "tabulation",
    // "image",
    "hr",
    "eraser",
    "undo",
    "full-screen",
    "simsir-upload"
  ],
  image: {
    sizeLimit: CONFIG.FILE.MAXSIZE,
    upload: {
      url: CONFIG.HTTP.API,
      headers: {},
      params: {},
      fieldName: {}
    },
    compress: null,
    uploadHandler() {},
  },
  modules: [{
    name: "simsir-upload",
    icon: "fa fa-image",
    i18n: "simsir-upload",
    show: true,
    init: function(editor) {

    },
    dashboard: {
      template: '<div><el-upload :action="pic.upload" :http-request="uploadPic" :show-file-list="false" :before-upload="uploadPicBefore" :on-success="handleSuccess"><el-button size="small">点击上传（图片限制1MB）</el-button></el-upload></div>',
      data: function() {
        return {};
      },
      mixins: [pic],
      methods: {
        handleSuccess(url) {
          if (url) {
            var newImg = new Image();
            newImg.src = url;
            newImg.onload = () => {
              setTimeout(() => {
                this.$parent.execCommand("insertHTML", '<img class="rich-text-image" src="' + url + '" />');
              }, 200);
            };
          } else {
            this.toastr('上传失败', 'error');
          }
        },
        uploadPicBefore(file) {
          if (file.size > CONFIG.FILE.MAXSIZE) {
            this.toastr(CONFIG.FILE.TIP, 'warning');
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }, {
    name: "simsir-empty",
    icon: "fa fa-edit",
    i18n: "simsir-empty",
    show: true,
    init: function(editor) {

    },
    dashboard: {
      template: '<div><el-input-number size="mini" v-model="count" min="1"></el-input-number><el-button @click="insertSpace">插入空格</el-button></div>',
      data: function() {
        return {
          count: 4
        };
      },
      methods: {
        insertSpace(file) {
          setTimeout(() => {
            let str = '';
            for (var i = 0; i < this.count; i++) {
              str += '&ensp;';
            }
            this.$parent.execCommand("insertHTML", str);
          }, 200);
        }
      }
    }
  }]
});

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueHighcharts);
Vue.use(VueResource);
Vue.use(GLOBAL);

Vue.config.productionTip = false;
Vue.http.options.root = CONFIG.MOCK.STATUS ? CONFIG.MOCK.API : CONFIG.HTTP.API;
// Vue.http.options.xhr = { withCredentials: true };
Vue.http.options.credentials = true;
document.documentElement.style.fontSize = '14px';

const store = new Vuex.Store({
  modules: stores,
});

Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  const user = store.getters.user;
  const nowtime = common.getNowSecond();
  if (user.access_token && !(/myqcloud/.test(request.url))) {
    const encrypt = md5(user.access_token + nowtime);
    request.headers.set(CONFIG.HTTP.TOKENHEADER, encrypt);
    request.headers.map[CONFIG.HTTP.TIMEHEADER] = [nowtime];
    request.headers.map[CONFIG.HTTP.USERIDHEADER] = [user.id];
  }

  // console.log(this) 此处this为请求所在页面的Vue实例
  // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
  next((response) => {
    if (response.status === 404) {
      return '找不到页面';
    }
    if (response.status === 403) {
      return '无权限访问';
    }
    if (response.status === 500) {
      if (response.body.error) {
        return response.body.error
      } else {
        return '服务器报错';
      }
    }
    if (response.status === 422) {
      return response.body.error;
    }
    if (response.status === 420 || response.status === 401) {
      router.replace('/');
      return '登录身份已失效';
    }
    if (CONFIG.MOCK.STATUS) {
      return response;
    } else {
      return Object.assign(response, {
        data: response.body.ret,
      });
    }
  });
});

router.beforeEach((to, from, next) => {
  // if (to.name == from.name) {
  //   window.location.reload(true);
  // }
  let user = store.getters.user;
  if (to.path == '/forgetpwd') {
    store.dispatch(USER_SIGNOUT);
    next();
    return;
  }
  if (to.name != 'login' && !CONFIG.MOCK.STATUS) {
    if (user.role_name) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  if (to.meta && to.meta.child) {
    store.dispatch(TITLE_UPDATE, to.meta.back ? from.name || to.meta.parent : to.meta.parent);
    store.dispatch(SUB_TITLE_UPDATE, to.name);
  } else {
    store.dispatch(SUB_TITLE_UPDATE, '');
    store.dispatch(TITLE_UPDATE, to.name);
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
});
