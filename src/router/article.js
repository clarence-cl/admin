import articles from '@/views/article/articles';
import category from '@/views/article/category';
import videos from '@/views/article/videos';
import videocate from '@/views/article/videocate';

export default [{
  path: '/articles',
  component: articles,
  name: '文章列表',
  meta: {
    keepAlive: true
  }
}, {
  path: '/articlecategory',
  component: category,
  name: '文章分类',
  meta: {
    keepAlive: false
  }
}, {
  path: '/videos',
  component: videos,
  name: '视频管理',
  meta: {
    keepAlive: true
  }
}, {
  path: '/videocate',
  component: videocate,
  name: '视频分类',
  meta: {
    keepAlive: false
  }
}];
