<template>
<div class="container">
  <el-card class="box-card" body-style="padding:0;">
    <div slot="header" class="clearfix">
      <el-button type="success" @click="showDialog" v-show="hasPermission('create')">添加文章分类</el-button>
    </div>
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="list" :height="containerH" border>
      <el-table-column prop="id" label="ID" align="center" width="70">
      </el-table-column>
      <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="detail" label="分类描述" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showDialog(scope.$index)" v-show="hasPermission('update')">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.$index)" v-show="hasPermission('delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog title="文章分类管理" :visible.sync="dialogVisible" :modal-append-to-body="false">
    <el-form :model="form">
      <el-form-item label="名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false;this.form={}">取消</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import crud from "@/mixins/crud";
export default {
  mixins: [crud],
  created() {
    this.refresh();
  },
  data() {
    return {
      resource: "article/category"
    };
  },
  methods: {
    refresh() {
      this.loading = true;
      this.$http.get('admin/' + this.resource + '/show' + this.getParams()).then(res => {
        this.list = res.data;
      }, msg => {
        this.list = [];
        this.toastr(msg, 'warning');
      }).finally(() => {
        this.loading = false;
      });
    },
    getParams() {
      return '';
    }
  }
};
</script>

<style scoped>
.expand-column-image {
  width: 100px;
}
</style>
