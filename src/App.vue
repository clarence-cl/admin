<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
}

.el-table {
  border: none;
}

.el-table ::-webkit-scrollbar {
  height: 8px;
}

.el-table ::-webkit-scrollbar-thumb {
  background: #c1c1c1;
}

.el-table ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

* {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
  "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
  "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif !important;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}

.avatar {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  border: 2px solid #fff;
}

.link:hover {
  cursor: pointer;
}

ul {
  list-style: none;
}

.shadow {
  /*box-shadow: 0 5px 10px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);*/
  box-shadow: 0 2px 12px hsla(0, 0%, 20%, 0.1), 0 0 0 1px hsla(0, 0%, 50%, 0.1);
  /*box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);*/
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 0px;
  animation: slideIn 0.5s ease;
  animation-fill-mode: forwards;
  overflow: scroll;
}

.new-container {
  height: 95%;
  padding: 40px ;
  box-sizing: border-box;
  animation: slideIn 0.5s ease;
  animation-fill-mode: forwards;
  overflow: scroll;
}

.icon-right {
  margin-right: 5px;
}

.icon-left {
  margin-left: 5px;
}

.el-menu .is-active .el-submenu__title {
  background: #fff;
}

.el-menu {
  background: #fff;
}

.el-submenu__title:hover {
  background: none;
}

.el-submenu .el-menu {
  background: #fff;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}

.el-menu-item .fa,
.el-submenu__title .fa {
  font-size: 17px;
  margin-right: 10px;
  margin-left: 7px;
  margin-top: -3px;
  color: #666;
}

.el-submenu__title i {
  color: #666;
}

.el-menu-item .fa,
.el-submenu__title .fa-users {
  font-size: 14px;
}

.el-menu-item.is-active {
  color: #fff;
  background: #409EFF;
  box-shadow: 0 2px 12px hsla(0, 0%, 20%, 0.1), 0 0 0 1px hsla(0, 0%, 50%, 0.1);
}

.el-menu-item:hover {
  background-color: #ffebeb;
}

.el-menu-item.is-active:hover {
  color: #fff;
  background: #409EFF;
}

.el-tabs__item:hover,
.el-tabs__item.is-active {
  color: #409EFF;
}

.el-tabs__active-bar {
  background-color: #409EFF;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-form-item .form-help {
  color: #999;
  font-size: 13px;
}

.el-table {
  border: none;
}

.el-message-box__close {
  position: absolute;
  top: 20px;
  right: 20px;
}

.el-card {
  /*box-shadow: none;*/
  width: 100%;
  box-shadow: 0 2px 2px hsla(0, 0%, 20%, 0.1), 0 0 0 1px hsla(0, 0%, 50%, 0.1);
}

.el-pagination {
  padding: 15px 0;
  padding-left: 30px;
}

.el-loading-mask {
  opacity: 1;
}

.el-tag {
  margin-bottom: 6px;
}

.el-dialog__body {
  padding-top: 10px;
}

.v-modal {
  opacity: 0.35;
}

.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.fa-right {
  margin-left: 8px;
}

.fa-left {
  margin-right: 8px;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.img-responsive {
  width: 100%;
  height: auto;
}

.w-e-droplist {
  z-index: 10001;
}

.empty-tip {
  text-align: center;
  color: #606266;
}
</style>
