import CONFIG from './config';

function isDoc(file) {
  let ext = file.substring(file.lastIndexOf(".") + 1, file.length);
  return CONFIG.FILE.DOCTYPE.indexOf(ext) >= 0;
}

function image(url) {
  if (!url) {
    return 'http://olf3xgrra.bkt.clouddn.com/image-not-found.svg';
  }

  return image;
}

function formatTime(n) {
  if (!n) {
    return '无时间';
  }
  let date = new Date(n * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatDate(n) {
  if (!n) {
    return '无时间';
  }
  let date = new Date(n * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  image: image,
  formatTime: formatTime,
  formatDate: formatDate,
  isDoc: isDoc
};
