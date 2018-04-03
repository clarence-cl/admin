export default {
  data() {
    return {
      config: {},
      loading: false,
      saveLoading: false
    }
  },
  methods: {
    geted() {

    },
    get() {
      this.loading = true;
      this.$http.get("admin/sysconfig/" + this.url + '/get').then(res => {
        this.config = res.data;
        this.loading = false;
        this.geted();
      }, msg => {
        this.toastr(msg, 'error');
        this.loading = false;
      });
    },
    save() {
      this.saveLoading = true;
      this.$http.put("admin/sysconfig/" + this.url + '/update', this.config).then(res => {
        this.toastr('保存成功', 'success');
      }, (msg) => {
        this.toastr(msg, 'error');
      }).finally(() => {
        this.saveLoading = false;
      });
    }
  }
}
