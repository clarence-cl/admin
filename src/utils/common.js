export default {
  formatTime: formatTime,
  formatDate: formatDate,
  getNowSecond: getNowSecond,
  getNow: getNow,
  getNowDate: getNowDate,
  convertTimeSpan: convertTimeSpan,
  formatMin: formatMin,
  multiCartesian: multiCartesian
};

function Cartesian(a, b) {
  var ret = [];
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      ret.push(array(a[i], b[j]));
    }
  }
  return ret;
}

function array(a, b) {
  var ret = [];
  if (!(a instanceof Array)) {
    ret = Array.call(null, a);
  } else {
    ret = Array.apply(null, a);
  }
  ret.push(b);
  return ret;
}

function multiCartesian(data) {
  var len = data.length;
  if (len == 0) {
    return [];
  } else if (len == 1) {
    return data[0];
  } else {
    var ret = data[0];
    for (var i = 1; i < len; i++) {
      ret = Cartesian(ret, data[i]);
    }
    return ret;
  }
}

function formatMin(time) {
  if (Number(time) <= 30) {
    return 0;
  }
  if (Number(time) <= 59) {
    return 1;
  }
  return Number(parseFloat((parseInt(time) / 60)).toFixed(2));
}

function convertTimeSpan(date) {
  return Date.parse(new Date(date)) / 1000;
}

function getNowDate(splitchar) {
  return formatDate(getNowSecond(), splitchar);
}

function getNowSecond() {
  return Date.parse(new Date()) / 1000;
}

function getNow() {
  return Date.parse(new Date());
}

function formatTime(n, splitchar) {
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


  return [year, month, day].map(formatNumber).join(splitchar || '/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatDate(n, splitchar) {
  if (!n) {
    return '无时间';
  }
  let date = new Date(n * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join(splitchar || '/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
