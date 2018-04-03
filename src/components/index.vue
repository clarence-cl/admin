<template>
  <div class="index">
    <!-- <i class="fa fa-navicon" v-on:click="toggleMenu"></i> -->
    <div class="nav" :class="collapse">
      <el-row class="user">
        <el-dropdown menu-align="start">
          <span class="el-dropdown-link">
            <transition name="el-fade-in">
              <img class="avatar shadow" v-show="collapse == 'collapse' && userinfo.head_pic && userinfo.head_pic.length>0" :src="userinfo.head_pic">
            </transition>
            <transition name="el-fade-in">
              <img class="avatar shadow" v-show="collapse == 'collapse' && userinfo.head_pic.length <= 0" :src="adminAvatar">
            </transition>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item @click.native="updateInfo">编辑信息</el-dropdown-item>
            <el-dropdown-item @click.native="updatePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
        <p class="phone" v-show="collapse == 'collapse'">{{ userinfo.phone }}</p>
      </el-row>
      <el-row>
        <transition name="el-fade-in">
          <el-menu class="el-menu-vertical-demo" @select="select">
            <template v-for="(menu,index) in menus">
              <template v-if="menu.child">
                <el-submenu style="margin-left:-5px;" :index="menu.title" v-show="collapse == 'collapse' && userinfo.role_name == '企业管理者'">
                  <template slot="title">
                    <i :class="menu.icon" style="transform: translateY(-1px);"></i>{{menu.title}}
                  </template>
                  <template v-for='item in menu.child'>
                    <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item :index="menu.title" v-show="collapse == 'collapsed' && userinfo.role_name == '企业管理者'">
                  <i :class="menu.icon"></i>
                </el-menu-item>
              </template>
              <template v-else>
                <el-menu-item :index="menu.path" v-if="userinfo.role_name == '超级管理员'">
                  <i :class="menu.icon"></i>
                  <span v-show="collapse == 'collapse'">{{menu.title}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </transition>
      </el-row>
    </div>
    <div class="main" :style="{ width: mainW + 'px' }">
      <div class="header">
        <span>
          <i class="fa fa-navicon" v-on:click="toggleMenu"></i>
        </span>
        <span v-show="title != '首页'">
          <a href="#/index/">首页</a>
        </span>
        <span v-show="title != '首页'">/</span>
        <span v-show="subtitle.length <= 0">{{title}}</span>
        <span v-show="subtitle.length > 0">
          <a @click="goToParent($event)" href="#">{{title}}</a>
        </span>
        <span v-show="subtitle.length > 0">/</span>
        <span v-show="subtitle.length > 0">{{subtitle}}</span>
        <span class="logout" @click="logout">退出登录
          <i class="fa fa-sign-out"></i>
        </span>
        <!-- <span class="lastlogin">上一次登录：广东深圳,2017/1/5</span> -->
      </div>
      <div class="index-content" :style="{ width: mainW + 'px', height: contentH + 'px' }">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import nav from "@/utils/nav";
import pic from "@/mixins/pic";
import config from '@/utils/config';
import { USER_SIGNOUT } from "@/stores/user";
import { mapGetters } from "vuex";
import adminAvatar from '@/assets/images/admin.png'

export default {
  mixins: [pic],
  name: "index",
  data() {
    return {
      menus: nav,
      mainW: window.innerWidth - 200,
      contentH: window.innerHeight - 50,
      collapse: "collapse",
      statusNum: 0,
      dialogVisible: false,
      showInfoLoading: false,
      passwordDialog: false,
      form: {},
      orderCommit: "",
      orderSend: "",
      adminAvatar: adminAvatar
    };
  },
  computed: {
    title() {
      return this.$store.getters.title;
    },
    subtitle() {
      return this.$store.getters.subtitle;
    },
    userinfo() {
      return this.$store.getters.user;
    }
  },
  created() {
  },
  mounted() {
    if (config.MOCK.STATUS) {
      return;
    }
  },
  methods: {
    playOrderAudio() {
      document.getElementById("audio-order").play();
    },
    updatePassword() {
      this.form = {};
      this.passwordDialog = true;
    },
    toggleMenu() {
      if (this.collapse === "collapsed") {
        this.collapse = "collapse";
        this.mainW = window.innerWidth - 200;
      } else {
        this.collapse = "collapsed";
        this.mainW = window.innerWidth - 60;
      }
    },
    select(key) {
      if (this.collapse === "collapsed") {
        this.collapse = "collapse";
        this.mainW = window.innerWidth - 200;
      } else {
        this.$router.push(key);
      }
    },
    goToParent(e) {
      e.preventDefault();
      if (this.$route.meta.back) {
        this.$router.go(-1);
      } else {
        this.$router.replace({
          name: this.$route.meta.parent
        });
      }
    },
    logout() {
      this.$http.get("admin/auth/logout").then(res => {
        this.$store.dispatch(USER_SIGNOUT);
        this.$router.replace('/')        
      });
    },
    repwd() {
      this.$router.push("/admin/repwd");
    },
  }
};
</script>

<style scoped>
.order-tips {
  position: absolute;
  top: 13px;
  right: 14px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #ff4949;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.user-avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}
.index {
  background: #f5f5f5;
  height: 100%;
  width: 100%;
}

.nav,
.main {
  float: left;
  height: 100%;
  position: relative;
}

.nav {
  background: #fff;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  z-index: 6;
}

.nav .user {
  text-align: center;
  padding: 35px 0;
  border-bottom: 1px solid #eee;
}
.nav .user img {
  margin-bottom: 10px;
}
.nav .user p {
  color: #777;
}
.nav .user .phone {
  font-size: 12px;
}

.main {
  z-index: 5;
  margin-left: -1px;
  transition: width 0.5s ease;
  overflow: hidden;
}

.main .header {
  background: #fff;
  height: 70px;
  line-height: 70px;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  padding-left: 10px;
}

.main .header span {
  font-size: 16px;
  color: #666;
  margin-left: 15px;
  font-weight: bold;
}

.main .header span a {
  font-size: 16px;
  color: #409EFF;
  font-weight: bold;
  text-decoration: none;
}

.main .header .lastlogin {
  color: #9a9a9a;
  font-size: 12px;
  float: right;
  margin-right: 20px;
}

.main .header .logout {
  color: #888;
  font-size: 12px;
  float: right;
  margin-right: 20px;
}

.main .header .logout i {
  margin-left: 5px;
}

.main .header .logout:hover {
  cursor: pointer;
}

.fa-navicon {
  /*position: absolute;
    left: 20px;
    top: 20px;
    z-index: 7;*/
  font-size: 16px;
  color: #666;
}

.fa-navicon:hover {
  cursor: pointer;
}

.main .index-content {
  overflow: auto;
  box-sizing: border-box;
  margin-top: 1px;
}

.main .index-content > div {
  height: 100%;
}

.collapse {
  width: 200px;
  overflow-y: scroll;
  transition: width 0.5s ease;
}

.collapsed {
  width: 60px;
  transition: width 0.5s ease;
}
.order-text {
  float: right;
  margin-left: 15px !important;
  margin-right: 15px;
  cursor: pointer;
  color: #888 !important;
  font-size: 12px !important;
}
.order-text span {
  font-size: 16px !important;
  color: red !important;
  margin-left: 8px !important;
}

#audio-order {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
