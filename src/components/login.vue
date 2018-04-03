<template>
<div class="login">
  <ul class="nav">
    <li @click="util.service()"><img src="../assets/images/service.png">客服系统</li>
  </ul>
  <div class="form shadow">
    <img style="width:20%;" src="../assets/images/admin.png" alt="">
    <el-input v-model="phone" placeholder="手机号"></el-input>
    <el-input v-model="password" type="password" placeholder="密码" @keyup.enter.native="login"></el-input>
    <!-- <div class="valicode" v-if="errorCount >= 3">
      <img :src="valiCodeImg" class="img-responsive" @click="reValidImg" v-if="valiCodeImg">
      <el-input v-model="valiCode" placeholder="验证码" @keyup.enter.native="login"></el-input>
    </div> -->
    <el-button @click="login" type="primary" :loading="loadingStatus">登录</el-button>
    <el-button @click="resetPwd = true" type="text" style="margin-left:0;margin-top:10px;color:#409EFF">忘记密码?</el-button>
  </div>
  <el-dialog title="重置密码" :visible.sync="resetPwd" size="tiny">
    <el-form ref="form" :model="form">
      <el-form-item prop="email" :rules="validate">
        <el-input v-model="form.email" placeholder="请输入您的电子邮箱"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetPwd = false">取 消</el-button>
      <el-button type="primary" @click="forgetpwd" :loading="repwdStatus" :disabled="isInValidate">提交</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import common from '@/utils/common';
import config from '@/utils/config';
import nav from "@/utils/nav";
import childPage from "@/router/child";
import allRoute from '@/router/routes';
import md5 from 'js-md5';
import {
  USER_SIGNIN, USER_SIGNOUT
} from '@/stores/user';
import {
  APPMENU, APPPERMISSIONS, INDEXPERMISSIONS, DEFAULTINDEX
} from '@/stores/app';

export default {
  name: 'login',
  created() {
    this.$router.replace('/')
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        this.isInValidate = true;
        callback(new Error('必须输入邮箱'));
      } else if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
        this.isInValidate = true;
        callback(new Error('请输入正确的邮箱'));
      } else {
        this.isInValidate = false;
        callback();
      }
    };
    return {
      phone: '',
      password: '',
      errorCount: 0,
      valiCode: '',
      loadingStatus: false,
      valiCodeImg: '',
      resetPwd: false,
      isInValidate: true,
      repwdStatus: false,
      key: '',
      validate: [{
        validator: validateEmail,
        trigger: 'change'
      }],
      form: {
        email: ''
      },
    };
  },
  methods: {
    login() {
      let params = {
        phone: this.phone,
        password: md5(this.phone + config.ENCRYPTKEY + this.password)
      }
      if (this.key.length > 0) {
        params.key = this.key;
      }
      this.loadingStatus = true;
      this.$http.post('admin/auth/login', params).then((res) => {
        this.$store.dispatch(USER_SIGNIN, res.data);
        this.$router.push('/index')
      }, (msg) => {
        this.toastr(msg, 'error');
        this.loadingStatus = false;
      })
    },
    reValidImg() {
      this.$http.get("admin/auth/image").then( res => {
        this.valiCodeImg = res.data;
      })
    },
    forgetpwd() {
      this.repwdStatus = true;
      this.$http.post('admin_user/reset_password', this.form).then(() => {
        this.repwdStatus = false;
        this.$alert('提交成功！请登录邮箱查看邮件', '提交成功', {
          confirmButtonText: '确定',
          callback: action => {
            this.resetPwd = false;
          }
        });
      }, (msg) => {
        this.repwdStatus = false;
        this.toastr(msg, 'error', {
          duration: 3000
        });
      })
    },
  }
};
</script>
<style scoped>
.login {
  background: url('../assets/images/bg.png');
  height: 100vh;
  width: 100vw;
  animation: slideIn 0.5s ease;
}

.nav {
  position: fixed;
  top: 10px;
  right: 20px;
}
.nav li {
  color: #666;
  margin: 10px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.nav li:hover {
  cursor: pointer;
}
.nav li img {
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}

.form {
  background: #fff;
  padding: 20px;
  padding-bottom: 15px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  /*box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);*/
}

.form img {
  margin-bottom: 20px;
}

.form .el-input {
  margin-bottom: 15px;
}

.form button {
  width: 100%;
}

.valicode {}

.valicode img {
  display: inline-block;
  border-radius: 5px;
  width: 40%;
  float: left;
}

.valicode .el-input {
  display: inline-block;
  width: 50%;
}
</style>
