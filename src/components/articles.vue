<template>
<div>
  <el-dialog title="选择文章" :visible.sync="dialog" :append-to-body="true" :before-close="beforeClose" @open="open" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-input v-model="keyword" style="width:200px;margin-bottom:8px;" @keyup.enter.native="search" placeholder="搜索关键词" @change="handleKeyword"></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <br>
    <el-radio-group v-model="checked">
      <p class="article" v-for="item in articleList" :key="item.id">
        <el-radio :label="item.id" @change="check">{{ item.title }}</el-radio>
      </p>
    </el-radio-group>
    <el-pagination style="padding:0;margin-top:5px;" @current-change="loadMore" :current-page="page" :page-size="pagesize" layout="prev, pager, next, total" :total="total"></el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import articles from "@/api/articles";
export default {
  created() {},
  mixins: [articles],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    success: Function,
    cancel: Function
  },
  data() {
    return {
      dialog: false,
      articleList: [],
      article: {},
      keyword: '',
      checked: '',
      page: 1,
      pagesize: 10,
      total: 0
    };
  },
  methods: {
    beforeClose(close) {
      this.dialog = false;
      this.$emit('update:visible', false);
      close();
    },
    open() {
      this.keyword = '';
      this.page = 1;
      this.article = {};
      this.checked = '';
      this.refresh();
    },
    close() {
      this.dialog = false;
      this.$emit('update:visible', false);
    },
    confirm() {
      if (this.article.id) {
        this.$emit('update:visible', false);
        this.success(this.article);
      } else {
        this.toastr('请选中文章', 'warning')
      }
    },
    search() {
      this.page = 1;
      this.refresh();
    },
    handleKeyword(keyword) {
      if (keyword == '') {
        this.search();
      }
    },
    refresh() {
      let params = '?page_size=' + this.pagesize + '&page_num=' + this.page;
      if (this.keyword != '') {
        params += '&keyword=' + this.keyword
      }
      this.$http.get("admin/article/show" + params).then(res => {
        this.articleList = res.data.data;
        this.total = res.data.total_count;
      }, msg => {
        this.articleList = [];
        this.total = 0;
      });
    },
    loadMore(val) {
      this.page = val;
      this.refresh();
    },
    check(val) {
      let article = this.articleList.filter(a => a.id == val);
      this.article = article[0];
    }
  },
  watch: {
    visible(val) {
      this.dialog = val;
    }
  },
};
</script>

<style scoped>
.article {
  margin: 20px 0;
}
</style>
