<template>
<div class="container">
  <el-card class="box-card" body-style="padding:0;">
    <div slot="header" class="clearfix">
      <el-select v-model="currentstatus" style="width:120px;" placeholder="企业状态" @change="search">
        <el-option v-for="item in statusList" :key="item.key" :label="item.title" :value="item.key"></el-option>
      </el-select>
      <el-input v-model="keyword" style="width:200px;" placeholder="搜索关键字" @keyup.enter.native="refresh" v-on:input="keywordSearch"></el-input>
      <el-button type="primary" class="btn-search" @click="search">搜索</el-button>
      <el-button type="success" @click="showDialog" v-show="hasPermission('create')">添加企业</el-button>
    </div>
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="list" :height="containerH" border row-class-name="simsir-table-row">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="企业头像">
              <a :href="props.row.head_pic" target="_blank">
                <img :src="props.row.head_pic" alt="" class="expand-column-image">                
              </a>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="70">
      </el-table-column>
      <el-table-column prop="name" label="企业名称" align="center"></el-table-column>
      <el-table-column prop="address" label="企业地址" align="center"> </el-table-column>
      <el-table-column prop="user_phone" label="登录手机" align="center" width="120">
      </el-table-column>
      <el-table-column label="是否可用" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 0 ? '可用' : '不可用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showDialog(scope.$index)" v-show="hasPermission('update')">编辑企业</el-button>
          <el-button type="danger" size="small" @click="remove(scope.$index)" v-show="hasPermission('delete')">删除企业</el-button>
          <el-button size="small" @click="toggleStatus(scope.$index)" v-show="hasPermission('update')">设为{{ scope.row.status == 0 ? '不可用':'可用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="loadMore" :current-page.sync="page" :page-size="pageSize" layout="prev, pager, next, total" :page-count="totalPage"></el-pagination>
  </el-card>
  <el-dialog title="企业管理" :visible.sync="dialogVisible" :modal-append-to-body="false" width="80%">
    <el-form :model="form">
      <el-row>
        <el-col :span="7">
          <el-form-item label="企业名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="企业地址：">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="2">
          <el-form-item label="登录手机：">
            <el-input v-model="form.user_phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="登录密码：" v-if="isAdd">
            <el-input v-model="form.user_password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="电子邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="2">
        </el-col>
      </el-row>
      <el-row>
      <el-form-item label="企业电话：">
        <el-input v-model="form.phone" placeholder="如有多个请用英文逗号(,)隔开"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="企业详情：">
            <el-input type="textarea" style="width:100%;" :rows="5" v-model="form.detail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="企业头像：">
            <img :src="headpic" class="expand-column-image" />
            <el-upload :action="pic.upload" :http-request="uploadPic" :show-file-list="false" :on-success="uploadUploadSuccess">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8" :push="2">
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false;this.form={}">取消</el-button>
      <el-button type="primary" @click="save()" :disabled="pic.loading">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import crud from "@/mixins/crud";
import pic from "@/mixins/pic";
export default {
  mixins: [crud, pic],
  created() {
    this.refresh();
  },
  data() {
    return {
      resource: "enterprise",
      keyword: '',
      currentstatus: 2,
      isAdd: false,
      statusList: [{
        title: '全部',
        key: 2
      }, {
        title: '可用',
        key: 0
      }, {
        title: '不可用',
        key: 1
      }],
      headpic: ''
    };
  },
  methods: {
    search() {
      this.page = 1;
      this.refresh();
    },
    getParams() {
      let params = {
        page_num: this.page,
        page_size: this.pageSize,
      }
      if (this.keyword != '') {
        params.keyword = this.keyword;
      }
      if (this.currentstatus == 0 || this.currentstatus == 1) {
        params.status = this.currentstatus;
      }
      return "?" + this.httpParamSerializer(params);
    },
    showDialoged() {
      if (!this.isAdd) {
        this.form.phone = this.form.phones.join(',')
        this.headpic = this.form.head_pic;
      }
    },
    uploadUploadSuccess(url) {
      if (url) {
        this.headpic = url;
        this.$set(this.form, "head_pic", url);
      }
    },
    save() {
      function success() {
        this.toastr('操作成功', 'success');
        this.refresh();
        this.dialogVisible = false;
      }
      let data = this.form;
      data.phones = data.phone.split(',');
      if (this.isAdd) {
        this.$http.post('admin/' + this.resource + '/add', data).then(success, (msg) => {
          this.toastr(msg, 'error');
        });
      } else {
        this.$http.put('admin/' + this.resource + '/' + this.form.id + '/update', data).then(success, (msg) => {
          this.toastr(msg, 'error');
        });
      }
    },
    toggleStatus(index) {
      this.$http.get((('admin/enterprise/' + this.list[index].id + '/update/') + (this.list[index].status == 1 ? '0' : '1'))).then(() => {
        this.toastr('设置成功', 'success');
        this.refresh();
      }, (msg) => {
        this.toastr(msg, 'error');
      })
    }
  }
};
</script>

<style scoped>
.expand-column-image {
  width: 100px;
}
</style>
