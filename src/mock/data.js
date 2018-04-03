import Mock from 'mockjs';

export const data = [{
  path: '/sysconfig/homepage/get',
  method: 'get',
  data: {
    "banner": [{
      "path": "http://p2bkiq8gf.bkt.clouddn.com/18-2-27/82830975.jpg",
      "article_id": "32"
    }, {
      "path": "http://p2bkiq8gf.bkt.clouddn.com/18-1-24/98958956.jpg",
      "article_id": "2"
    }],
    "blocks": [{
      "title": "标题",
      "sub_title": "子标题",
      "sub_blocks": [{
        "type": "0",
        "item_id": "32"
      }, {
        "type": "1",
        "item_id": "23"
      }]
    }, {
      "title": "标题",
      "sub_title": "子标题",
      "sub_blocks": [{
        "type": "0",
        "item_id": "2"
      }, {
        "type": "1",
        "item_id": "23"
      }]
    }]
  }
}, {
  path: '/article/search?keyword=',
  method: 'get',
  data: {
    "total_count": 123,
    "data": [{
      "id": '1',
      "title": "文章标题",
      "origin_pic": "视频首图 可为空"
    }, {
      "id": '32',
      "title": "文章标题23",
      "origin_pic": "视频首图 可为空"
    }]
  }
}, {
  path: '/video/search?keyword=',
  method: 'get',
  data: {
    "total_count": 123,
    "data": [{
      "id": 1,
      "title": "视频标题1",
      "origin_pic": "视频首图 可为空"
    }]
  }
}, {
  path: '/video/search?keyword=s',
  method: 'get',
  data: {
    "total_count": 123,
    "data": [{
      "id": '22',
      "title": "视频标题22",
      "origin_pic": "视频首图 可为空"
    }, {
      "id": '223',
      "title": "视频标题223",
      "origin_pic": "视频首图 可为空"
    }]
  }
}, {
  path: '/article/search?keyword=s',
  method: 'get',
  data: {
    "total_count": 123,
    "data": [{
      "id": '5',
      "title": "文章标题新",
      "origin_pic": "视频首图 可为空"
    }, {
      "id": '23',
      "title": "文章标题新23",
      "origin_pic": "视频首图 可为空"
    }]
  }
}, {
  path: '/auth/login',
  method: 'post',
  data: {
    "phone": "12345667889",
    "role_name": "企业管理者",
    "head_pic": '',
    "enterprise": {
      "id": 1,
      "name": "name",
      "address": "",
      "phones": [
        "企业电话"
      ],
      "detail": "企业详情",
      "head_pic": "企业头像  如为空，使用默认头像",
      "is_valid": "是否可用，0表示是， 表示否"
    }
  }
}, {
  path: '/sysconfig/dynamic/get',
  method: 'get',
  data: [{
    "tag_name": "标签名字",
    "articles": [{
      "id": '2',
      "title": "文章标题",
      "origin_pic": "http://p2bkiq8gf.bkt.clouddn.com/18-1-24/98958956.jpg"
    }, {
      "id": '1',
      "title": "文章标题2",
      "origin_pic": "http://p2bkiq8gf.bkt.clouddn.com/18-1-24/98958956.jpg"
    }]
  }]
}, {
  path: '/article/show?page_num=1&page_size=10',
  method: 'get',
  data: {
    "page_count": 10,
    "total_count": 123,
    "data": [{
      "id": 1,
      "title": "文章标题",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "文章首图",
      "author": "文章作者 如为空，显示佚名",
      "category": "文章分类",
      "view_num": "浏览量"
    }, {
      "id": 2,
      "title": "文章标题2",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "文章首图",
      "author": "文章作者 如为空，显示佚名",
      "category": "文章分类",
      "view_num": "浏览量"
    }, {
      "id": 322,
      "title": "文章标题2",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "文章首图",
      "author": "文章作者 如为空，显示佚名",
      "category": "文章分类",
      "view_num": "浏览量"
    }]
  }
}, {
  path: '/article/show?page_size=10&page_num=1&keyword=s',
  method: 'get',
  data: {
    "page_count": 10,
    "total_count": 123,
    "data": [{
      "id": 1,
      "title": "文章标题",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "文章首图",
      "author": "文章作者 如为空，显示佚名",
      "category": "文章分类",
      "view_num": "浏览量"
    }]
  }
}, {
  path: '/sysconfig/introduction/get',
  method: 'get',
  data: [{
    "type": "1",
    "article": {
      "id": "4",
      "title": "文章标题",
      "origin_pic": "文章首图"
    }
  }, {
    "type": "2",
    "article": {
      "id": "3",
      "title": "文章标题",
      "origin_pic": "文章首图"
    }
  }]
}, {
  path: '/enterprise/show?page_num=1&page_size=10',
  method: 'get',
  data: {
    "page_count": 10,
    "data": [{
      "id": 1,
      "name": "name",
      "address": "企业详情企业详情企业详情企业详情",
      "phones": [
        "企业电话"
      ],
      "detail": "企业详情",
      "head_pic": "http://p2bkiq8gf.bkt.clouddn.com/18-1-29/17071726.jpg",
      "user_phone": "登陆手机号",
      "email": "邮箱",
      "status": "0"
    }]
  }
}, {
  path: '/article/category/show',
  method: 'get',
  data: [{
    "id": 2,
    "name": "分类名称",
    "detail": "分类详情"
  }, {
    "id": 323,
    "name": "分类名称2",
    "detail": "分类详情"
  }]
}, {
  path: '/video/category/show',
  method: 'get',
  data: [{
    "id": 2,
    "name": "视频费力",
    "detail": "分类详情"
  }, {
    "id": 323,
    "name": "分类名称2",
    "detail": "分类详情"
  }]
}, {
  path: '/video/show?page_num=1&page_size=10',
  method: 'get',
  data: {
    "page_count": 10,
    "total_count": 123,
    "data": [{
      "id": 1,
      "title": "视频标题",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "视频首图",
      "author": "视频作者 如为空，显示佚名",
      "category": "视频分类",
      "url": "视频链接",
      "view_num": "浏览量"
    }, {
      "id": 12,
      "title": "视频标题2",
      "add_time": "2010/2/1 20:23",
      "origin_pic": "视频首图",
      "author": "视频作者 如为空，显示佚名",
      "category": "视频分类",
      "url": "视频链接",
      "view_num": "浏览量"
    }]
  }
}, {
  path: '/comment/show?status=2',
  method: 'get',
  data: [{
    "id": "评价ID",
    "username": "姓名",
    "phone": "手机号",
    "content": "内容",
    "add_time": "评价时间 2017-01-22 11:22"
  }, {
    "id": "评价ID",
    "username": "姓名",
    "phone": "手机号",
    "content": "内容",
    "add_time": "评价时间 2017-01-22 11:22"
  }]
}]
