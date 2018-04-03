import article from '@/views/article/article';
import video from '@/views/article/video';

export default [{
  path: '/articles/:id',
  component: article,
  name: '文章编辑',
  meta: {
    child: true,
    parent: '文章列表',
    back: false
  }
}, {
  path: '/videos/:id',
  component: video,
  name: '视频编辑',
  meta: {
    child: true,
    parent: '视频管理',
    back: false
  }
}];
