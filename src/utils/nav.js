import web from '@/router/web';
import enterprise from '@/router/enterprise';
import article from '@/router/article';

export default [{
  title: '企业管理',
  icon: 'el-icon-setting',
  path: '/enterprise/enterprises'
}, {
  title: '文章管理',
  icon: 'el-icon-document',
  child: article,
}, {
  title: '程序配置',
  icon: 'el-icon-menu',
  child: web,
}];
