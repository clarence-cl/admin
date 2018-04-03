import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

import index from '@/components/index';
import login from '@/components/login';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login,
  }, {
    path: '/index',
    component: index,
    name: '首页',
    children: routes,
  }],
});
