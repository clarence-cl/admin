<template>
<div class="new-container" v-loading="loading" element-loading-text="拼命加载中">
  <articles :visible.sync="articlesvisible" :success="handelSuccess"></articles>
  <el-form label-width="110px" class="form" label-position="left">
    <el-form-item :label="c.name" v-for="c,index in localconfig" :key="c.name">
      <span class="fa-left">{{ c.article.title }}</span>
      <el-button type="text" @click="changeArticle(index)">设置文章</el-button>
      <el-button type="text" style="color:red" @click="removeArticle(index)" v-if="c.article.id">删除文章</el-button>
    </el-form-item>
  </el-form>
  <el-button style="margin-top:10px;" type="primary" @click="save()" :loading="saveLoading">保存</el-button>
</div>
</template>

<script>
import config from "@/mixins/config";
import articles from '@/components/articles.vue';
export default {
  mixins: [config],
  components: {
    articles
  },
  created() {
    this.get();
  },
  data() {
    return {
      url: 'introduction',
      articlesvisible: false,
      handleIndex: 0,
      localconfig: [{
        type: 0,
        name: '简介',
        article: {}
      }, {
        type: 1,
        name: '荣誉奖项',
        article: {}
      }, {
        type: 2,
        name: '企业文化',
        article: {}
      }]
    };
  },
  methods: {
    geted() {
      for (let i = 0; i < this.config.length; i++) {
        if (this.config[i].type == 0) {
          this.localconfig[0].article = this.config[i].article
        }
        if (this.config[i].type == 1) {
          this.localconfig[1].article = this.config[i].article
        }
        if (this.config[i].type == 2) {
          this.localconfig[2].article = this.config[i].article
        }
      }
    },
    removeArticle(index) {
      this.localconfig[index].article = {};
    },
    handelSuccess(article) {
      this.localconfig[this.handleIndex].article = article;
    },
    changeArticle(index) {
      this.handleIndex = index;
      this.articlesvisible = true
    },
    save() {
      let data = [];
      this.saveLoading = true;
      for (let i = 0; i < this.localconfig.length; i++) {
        if (this.localconfig[i].article.id) {
          data.push({
            type: this.localconfig[i].type,
            article_id: this.localconfig[i].article.id
          })
        }
      }
      this.$http.put("admin/sysconfig/" + this.url + '/update', data).then(res => {
        this.toastr('保存成功', 'success');
      }, (msg) => {
        this.toastr(msg, 'error');
      }).finally(() => {
        this.saveLoading = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
