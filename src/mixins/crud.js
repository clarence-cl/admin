import common from '@/utils/common';

export default {
  data() {
    return {
      containerH: window.innerHeight - 250,
      loading: false,
      page: 1,
      pageSize: 10,
      list: [],
      totalPage: 0,
      dialogVisible: false,
      form: {},
      showDetailLoading:'',
    }
  },
  methods: {
    refresh() {
      this.loading = true;
      this.$http.get('admin/' + this.resource + '/show' + this.getParams()).then(res => {
        this.list = res.data.data;
        this.totalPage = res.data.page_count;
        this.refreshed();
      }, msg => {
        this.list = [];
        this.toastr(msg, 'warning');
      }).finally(() => {
        this.loading = false;
      });
    },
    refreshed() {
    },
    setDetail() {
    },
    getParams() {
      return '?' + this.httpParamSerializer({
        page_num: this.page,
        page_size: this.pageSize
      });
    },
    loadMore(val) {
      this.page_num = val;
      this.refresh();
    },
    keywordSearch(val){
      if(val == ''){
        this.refresh();
      }
    },
    getDetail(id){
      this.showDetailLoading = true;
      this.$http.get('admin/' + this.resource + '/get/' + id).then(res => {
        this.form = res.data;
      }, msg => {
        this.toastr(msg, 'info');
      }).finally(() => {
        this.showDetailLoading = false;
      });
    },
    remove(index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.delete('admin/' + this.resource + '/' + this.list[index].id + '/delete').then(() => {
          this.toastr('删除成功', 'success');
          this.refresh();
        }, (msg) => {
          this.toastr(msg, 'error');
        });
      });
    },
    showDialog(index) {
      if (typeof index === 'number') {
        this.form = Object.assign({}, this.list[index]);
        this.isAdd = false;
      } else {
        this.isAdd = true;
        this.form = {};
      }
      this.dialogVisible = true;
      this.showDialoged();
    },
    showDialoged() {

    },
    saveBefore() {
      return Promise.resolve();
    },
    save() {
      function success() {
        this.toastr('操作成功', 'success');
        this.refresh();
        this.dialogVisible = false;
      }
      this.saveBefore().then(() => {
        if (this.isAdd) {
          this.$http.post('admin/' + this.resource + '/add', this.form).then(success, (msg) => {
            this.toastr(msg, 'error');
          });
        } else {
          this.$http.put('admin/' + this.resource + '/' + this.form.id + '/update', this.form).then(success, (msg) => {
            this.toastr(msg, 'error');
          });
        }
      });
    },
  },
  created() {
  },
  filters: common
}
