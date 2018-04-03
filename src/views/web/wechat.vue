<template>
<div class="new-container" v-loading="loading" element-loading-text="拼命加载中">
  <el-tabs type="card">
    <el-tab-pane label="小程序配置">
      <el-form :model="config" label-width="110px" class="form" label-position="left">
        <el-form-item label="小程序标题">
          <el-input v-model="config.title" placeholder="小程序标题"></el-input>
        </el-form-item>
        <el-form-item label="AppID">
          <el-input v-model="config.app_id"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret">
          <el-input v-model="config.app_secret"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" :loading="saveLoading">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import config from "@/mixins/config";
import pic from "@/mixins/pic";
export default {
  name: "wechat",
  mixins: [config, pic],
  created() {
    this.get();
  },
  data() {
    return {
      url: 'wechat/applet'
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.form {
  margin-top: 25px;
  margin-left: 10px;
}

.el-form-item {
  width: 45%;
  margin-bottom: 20px;
}
</style>
