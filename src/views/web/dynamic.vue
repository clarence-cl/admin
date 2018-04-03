<template>
<div class="new-container" v-loading="loading" element-loading-text="拼命加载中">
  <articles :visible.sync="articlesvisible" :success="handelSuccess"></articles>
  <div>
    <el-button type="success" @click="addTag()">添加标签</el-button>
    <el-tabs style="margin: 30px 0;" v-model="tabIndex" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item,index in config" :key="index" :label="item.tagname" :name="item.tagname">
        <el-form class="form" label-width="80px" style="width:90%;">
          <el-form-item label="标签名称">
            <el-input v-model="item.tag_name"></el-input>
          </el-form-item>
          <p style="margin:20px 10px 10px 10px; color:#606266">文章列表：</p>
          <span class="article" v-for="article,aindex in item.articles" :key="aindex">
            <span class="fa-left">{{ article.title }}</span>
            <el-button type="text" @click="changeArticle(index, aindex)">修改</el-button>
            <el-button type="text" style="color:red;" @click="removeArticle(index, aindex)">删除</el-button>
          </span>
          <el-button style="margin-left:10px;margin-top:10px;" @click="addArticle(index)">添加文章</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button style="margin-left:10px;margin-top:10px;" type="primary" @click="save()" :loading="saveLoading">保存</el-button>
  </div>
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
      url: 'dynamic',
      tabIndex: null,
      articlesvisible: false,
      handleTagIndex: 0,
      handleArticleIndex: 0
    };
  },
  methods: {
    changeArticle(index, aindex) {
      this.handleTagIndex = index;
      this.handleArticleIndex = aindex;
      this.articlesvisible = true
    },
    geted() {
      for (let i = 0; i < this.config.length; i++) {
        this.config[i].tagname = this.config[i].tag_name;
      }
      this.tabIndex = this.config[0].tagname;
    },
    handelSuccess(article) {
      this.config[this.handleTagIndex].articles[this.handleArticleIndex] = article;
    },
    removeTab: function(tagname) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.config = this.config.filter(tab => tab.tagname !== tagname);
        if (this.tabIndex == tagname) {
          this.tabIndex = this.config[0].tagname;
        }
      });
    },
    addArticle: function(index) {
      this.config[index].articles.push({
        title: '空文章'
      })
      this.changeArticle(index, this.config[index].articles.length - 1);
    },
    removeArticle: function (index, aindex) {
      this.config[index].articles.splice(aindex, 1)
    },
    addTag: function() {
      let title = '第' + (this.config.length + 1) + '个标签'
      this.config.push({
        tag_name: title,
        tagname: title,
        articles: []
      })
      this.tabIndex = title;
    },
    save() {
      let data = [];
      this.saveLoading = true;
      for (let i = 0; i < this.config.length; i++) {
        let tmp = {};
        tmp.tag_name = this.config[i].tag_name;
        tmp.articles = [];
        for (let j = 0; j < this.config[i].articles.length; j++) {
          if (this.config[i].articles[j].id) {
            tmp.articles.push(Number(this.config[i].articles[j].id))
          }
        }
        data.push(tmp)
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
.form {
  width: 400px;
}

.article {
  padding: 10px;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
</style>
