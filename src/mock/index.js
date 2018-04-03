import CONFIG from '@/utils/config';

import Mock from 'mockjs';
import { data } from './data.js';

function addToMock(list) {
  list.forEach(n => {
    Mock.mock(CONFIG.MOCK.API + '/admin' + n.path, n.method, n.data);
  })
}

addToMock(data);

Mock.mock(CONFIG.MOCK.API + '/admin_user/image', function() {
  return {
    url: 'http://7xo0sl.com1.z0.glb.clouddn.com/show3.png'
  };
});

export default Mock;
