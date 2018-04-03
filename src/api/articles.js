export default {
  methods: {
    articles(page, keyword) {
      let params = {
        page_size: 10,
        page_num: 1
      }
      params.page_num = page;
      if (keyword && keyword != '') {
        params.keyword = keyword
      }
      return this.$http.get("admin/article/show?" + this.httpParamSerializer(params)).then(res => {
        return res.data;
      }, msg => {
        this.toastr(msg, 'error');
        return [];
      });
    }
  }
}
