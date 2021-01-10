<template>
  <div id="user">
    <el-container style="height: 100%" direction="vertical">
      <el-header>
        <el-form :inline="true" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input
              placeholder="请输入用户名"
              v-model="user_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUser()" plain>查询</el-button>
            <el-button type="info" plain @click="dialogFormVisible = true"
              >新增用户</el-button
            >
            <el-button type="primary" @click="showUser()">所有用户</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <template>
          <el-table
            :data="tableData"
            height="1000px"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="user_name2" label="用户名">
            </el-table-column>
            <el-table-column prop="password2" label="密码"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="delUser(scope.row)" type="text" size="small"
                  >删除</el-button
                >
                <el-button type="text" size="small" @click="obtain(scope.row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </el-container>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form2.name2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form2.password2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="setUser()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      user_name: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        password: "",
      },
      form2: {
        name2: "",
        password2: "",
      },
      formLabelWidth: "70px",
      tableData: [
        {
          user_name2: "",
          password2: "",
        },
      ],
      search: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    obtain(param) {
      let vm = this;
      vm.form2.name2 = param.user_name2;
      vm.dialogFormVisible2 = true;
      console.log(param);
    },
    showUser() {
      let vm = this;
      vm.$http({
        method: "get",
        url: "/api/get_user",
      })
        .then((res) => {
          console.log(res);
          vm.tableData = res.data.data.data.map((a) => {
            return {
              user_name2: a.name,
              password2: a.password,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
      vm.user_name = "";
    },
    delUser(param) {
      console.log(param);
      let name = param.user_name2;
      let vm = this;
      vm.$http({
        method: "post",
        url: "/api/del_user",
        data: {
          name: name,
        },
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
      vm.showUser();
    },
    addUser() {
      let vm = this;
      vm.dialogFormVisible = false;
      vm.$http({
        method: "post",
        url: "/api/add_user",
        data: {
          name: vm.form.name,
          password: vm.form.password,
        },
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
      vm.form.name = "";
      vm.form.password = "";
      vm.showUser();
    },
    setUser() {
      let vm = this;
      vm.dialogFormVisible2 = false;
      vm.$http({
        method: "post",
        url: "/api/set_user",
        data: {
          name: vm.form2.name2,
          password: vm.form2.password2,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({
              message: res.data.data.msg,
            });
          } else {
            vm.$message({
              message: res.data.error_des,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
      vm.form2.password2 = "";
      vm.showUser();
    },
    getUser() {
      let vm = this;
      let baseurl = "/api/get_user?";

      if (vm.user_name != "") {
        baseurl = baseurl + "name" + "=" + vm.user_name;
      }

      vm.$http({
        method: "get",
        url: baseurl,
      })
        .then((res) => {
          console.log(res);
          vm.tableData = res.data.data.data.map((a) => {
            return {
              user_name2: a.name,
              password2: a.password,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    let vm = this;
    vm.showUser();
  },
};
</script>

<style scoped>
.el-header {
  background-color: #e9eef3;
  color: #333;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-input {
  width: 500px;
}
</style>

<style>
html,
body,
#app,
#user,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>