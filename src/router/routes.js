import web from './web';
import enterprise from './enterprise';
import article from './article';
import child from './child';
import home from '@/components/home';

const routes = [
  {
    path: '/',
    component: home,
    name: '首页',
  }, ...child, ...web, ...enterprise, ...article];

export default routes;
