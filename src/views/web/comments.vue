<template>
<div class="container">
  <el-card class="box-card" body-style="padding:0;">
    <div slot="header" class="clearfix">
      <el-select v-model="currentstatus" style="width:120px;" placeholder="评论状态" @change="refresh">
        <el-option v-for="item in statusList" :key="item.key" :label="item.title" :value="item.key"></el-option>
      </el-select>
    </div>
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="list" :height="containerH" border>
      <el-table-column prop="id" label="ID" align="center" width="80">
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center"> </el-table-column>
      <el-table-column prop="content" label="内容" align="center"> </el-table-column>
      <el-table-column prop="add_time" label="评价时间" align="center"> </el-table-column>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="toggleStatus(scope.$index)" v-show="hasPermission('update')">标记为已读</el-button>
          <el-button type="primary" size="small" @click="showDialog(scope.$index)" v-show="hasPermission('update')">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.$index)" v-show="hasPermission('delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="loadMore" :current-page.sync="page" :page-size="pageSize" layout="prev, pager, next, total" :page-count="totalPage"></el-pagination>
  </el-card>
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
      resource: 'comment',
      currentstatus: 2,
      statusList: [{
        title: '全部',
        key: 2
      }, {
        title: '已读',
        key: 0
      }, {
        title: '未读',
        key: 1
      }]
    };
  },
  methods: {
    toggleStatus(index) {
      this.$http.get('admin/comment/' + this.list[index].id + '/status/0').then(res => {
        this.toastr('标记成功', 'success');
        this.refresh();
      }, msg => {
        this.toastr(msg, 'warning');
      })
    },
    getParams() {
      let params = {
        page_num: this.page,
        page_size: this.pageSize,
      }
      if (this.currentstatus != 2) {
        params.status = this.currentstatus;
      }
      return "?" + this.httpParamSerializer(params);
    }
  }
};
</script>

<style scoped>
.expand-column-image {
  width: 100px;
}
</style>
