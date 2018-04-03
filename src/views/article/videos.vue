<template>
<div class="container">
  <el-card class="box-card" body-style="padding:0;" v-if="hasPermission('query')">
    <div slot="header" class="clearfix">
      <el-input v-model="keyword" style="width:200px;" placeholder="搜索关键字" @keyup.enter.native="refresh" v-on:input="keywordSearch"></el-input>
      <el-button type="primary" class="btn-search" @click="search">搜索</el-button>
      <el-button type="success" class="shadow" @click="$router.push('videos/0')" v-if="hasPermission('create')">添加视频</el-button>
    </div>
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="list" border :height="containerH" row-class-name="simsir-table-row">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left">
            <el-form-item label="视频首图">
              <a :href="props.row.origin_pic" target="_blank">
                <img :src="props.row.origin_pic" alt="" class="expand-column-image">
              </a>
            </el-form-item>
            <el-form-item label="视频链接">
              <a :href="props.row.url" target="_blank">{{ props.row.url }}</a>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center"></el-table-column>
      <el-table-column prop="category" label="视频分类" align="center"></el-table-column>
      <el-table-column prop="view_num" label="浏览量" align="center"></el-table-column>
      <el-table-column label="添加时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button @click="$router.push('videos/' + scope.row.id)" size="small" type="primary" v-if="hasPermission('update')">编辑</el-button>
          <el-button @click="remove(scope.$index)" size="small" type="danger" v-if="hasPermission('delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="loadMore" :current-page.sync="page" :page-size="pageSize" layout="prev, pager, next, total" :page-count="totalPage"></el-pagination>
  </el-card>
</div>
</template>

<script>
import filters from '@/utils/filters';
import crud from '@/mixins/crud';
export default {
  mixins: [ crud ],
  filters: filters,
  created() {
    // this.refresh();
  },
  activated() {
    this.refresh();
  },
  data() {
    return {
      keyword: '',
      resource: 'video'
    }
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
      return "?" + this.httpParamSerializer(params);
    },
  },
};
</script>

<style scoped>
</style>
