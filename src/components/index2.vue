<template>
  <div id="index2">
    <el-container style="height: 100%" direction="vertical">
      <el-header>后台管理系统</el-header>
      <el-container>
        <el-aside width="300px">
          <el-menu
            default-active="/index2/main"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100%"
            :router="true"
          >
            <el-menu-item index="/index2/main1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-menu-item index="/index2/data_manage">
              <i class="el-icon-location"></i>
              <span slot="title">数据管理</span>
            </el-menu-item>

            <el-menu-item index="/index2/user">
              <i class="el-icon-document"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-menu-item index="/Login" @click="logout()">
              <i class="el-icon-setting"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index2",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      let vm = this;
      vm.$http({
        method: "get",
        url: "/api/logout",
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({
              message: res.data.data.msg,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.el-header {
  font-weight: 700;
  background-color: #333;
  color: #fff;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>

<style>
html,
body,
#app,
#index2,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>