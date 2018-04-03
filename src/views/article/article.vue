<template>
<div class="new-container">
  <div class="empty-tip" v-if="categories.length <= 0">
    请先添加文章分类再添加文章
  </div>
  <el-form ref="form" :model="form" label-width="100px" class="form" v-if="categories.length > 0">
    <el-form-item label="文章分类：">
      <el-select v-model="form.category_id" placeholder="请选择文章分类">
        <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章标题：">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章作者：">
      <el-input v-model="form.author"></el-input>
    </el-form-item>
    <el-form-item label="文章图片：">
      <img :src="form.origin_pic" class="expand-column-image" />
      <el-upload :action="pic.upload" :http-request="uploadPic" :show-file-list="false" :on-success="uploadUploadSuccess">
        <el-button size="small">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="文章内容：">
      <vue-html5-editor :content="form.content" :height="300" :auto-height="false" @change="updateContent"></vue-html5-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="sub" :loading="loading" :disabled="pic.loading">保存</el-button>
      <el-button @click="$router.go(-1)" :disabled="pic.loading">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import pic from "@/mixins/pic";
export default {
  mixins: [pic],
  created() {
    this.$http.get('admin/article/category/show').then((res) => {
      this.categories = res.data;
      if (this.$route.params.id > 0) {
        this.isAdd = false
        this.$http.get('admin/article/' + this.$route.params.id + '/get').then((res) => {
          this.form = res.data;
        });
      }
    });
  },
  data() {
    return {
      form: {
        content: '',
        title: '',
        author: '',
        category_id: '',
        origin_pic: ''
      },
      loading: false,
      categories: [],
      isAdd: true
    };
  },
  methods: {
    updateContent(content) {
      this.form.content = content;
    },
    sub() {
      function fail(msg) {
        this.toastr(msg, 'error')
      }
      if (this.isAdd) {
        this.$http.post('admin/article/add', this.form).then(() => {
          this.toastr('添加成功', 'success');
          this.$router.go(-1);
        }, fail);
      } else {
        this.$http.put('admin/article/' + this.$route.params.id + '/update', this.form).then(() => {
          this.toastr('保存成功', 'success');
        }, fail);
      }
    },
    uploadUploadSuccess(url) {
      if (url) {
        this.$set(this.form, "origin_pic", url);
      }
    },
  }
};
</script>

<style scoped>
.expand-column-image {
  width: 120px;
}
</style>
