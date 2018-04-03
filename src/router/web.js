import wechat from '@/views/web/wechat';
import home from '@/views/web/home';
import dynamic from '@/views/web/dynamic';
import introduction from '@/views/web/introduction';
import comments from '@/views/web/comments';
import enterprise from '@/views/enterprise/enterprises';

export default [{
  path: '/config/introduction',
  component: introduction,
  name: '公司简介'
}, {
  path: '/config/dynamic',
  component: dynamic,
  name: '企业动态'
}, {
  path: '/config/wechat',
  component: wechat,
  name: '微信配置'
}, {
  path: '/config/home',
  component: home,
  name: '首页配置'
}, {
  path: '/comments',
  component: comments,
  name: '评论列表'
},{
  path: '/enterprise',
  component: enterprise,
  name: '企业信息'
},];
