export default {
  install(Vue) {
    Vue.prototype.toastr = function(title, type, options = {}) {
      this.$message({
        type: type || 'info',
        duration: options.duration || 3000,
        message: title
      });
    };
    Vue.prototype.copyObject = function(obj) {
      return Object.assign({}, obj);
    };
    Vue.prototype.httpParamSerializer = function(params) {
      let arr = [];
      for (let key in params) {
        if (params[key]) {
          arr.push(key + '=' + params[key]);
        }
      }
      return arr.join('&');
    };
    Vue.prototype.util = {
      go(url) {
        window.location.href = url;
      },
      open(url) {
        window.open(url);
      },
      service() {
        window.open('https://shop.xinzhibang168.com/custom-service.html');
      },
      refresh() {
        window.location.reload();
      }
    };

    Vue.mixin({
      methods: {
        hasPermission(permission) {
          return true;
        },
      }
    })
  },
};
