<template>
  <div id="data_manage">
    <el-container style="height: 100%" direction="vertical">
      <el-header style="height: 120px">
        <el-form :inline="true" :model="form" label-width="80px">
          <el-form-item label="作者">
            <el-input
              placeholder="请输入作者"
              v-model="user_name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getArticle()">查询</el-button>
            <el-button type="info" plain @click="dialogFormVisible = true"
              >新增说说</el-button
            >
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input
              placeholder="请输入标题"
              v-model="title"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getArticle2()">查询</el-button>
            <el-button type="primary" @click="showArticle()"
              >所有数据</el-button
            >
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
            <el-table-column prop="user_name2" label="用户"> </el-table-column>
            <el-table-column prop="title2" label="标题"> </el-table-column>
            <el-table-column prop="content2" label="内容"> </el-table-column>
            <el-table-column prop="date2" label="日期"> </el-table-column>
            <el-table-column prop="other2" label="作者"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="delArticle(scope.row)"
                  type="text"
                  size="small"
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

    <el-dialog title="新增说说" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.other" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addArticle()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改说说" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form2.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form2.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form2.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form2.other" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="form2.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="setArticle()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "data_manage",
  data() {
    return {
      user_name: "",
      title: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        title: "",
        date: "",
        content: "",
        other: "",
        id: "",
      },
      form2: {
        name: "",
        title: "",
        date: "",
        content: "",
        other: "",
        id: "",
      },
      formLabelWidth: "70px",
      tableData: [
        {
          user_name2: "",
          title2: "",
          content2: "",
          date2: "",
          other2: "",
        },
      ],
    };
  },
  methods: {
    obtain(param) {
      console.log(param);
      let vm = this;
      vm.dialogFormVisible2 = true;
      vm.form2.id = param.id2;
      vm.form2.name = param.user_name2;
      vm.form2.content = param.content2;
      vm.form2.title = param.title2;
      vm.form2.other = param.other2;
    },
    showArticle() {
      let vm = this;
      vm.$http({
        method: "get",
        url: "/api/get_article",
      })
        .then((res) => {
          console.log(res);
          vm.tableData = res.data.data.data.map((a) => {
            return {
              user_name2: a.user_name,
              title2: a.title,
              content2: a.content,
              date2: a.create_date,
              other2: a.author,
              id2: a.id_article,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
        vm.user_name = "";
        vm.title = '';
    },
    delArticle(param) {
      console.log(param);
      let vm = this;
      vm.$http({
        method: "post",
        url: "/api/del_article",
        data: {
          id: param.id2,
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
      vm.showArticle();
    },
    addArticle() {
      let vm = this;
      vm.dialogFormVisible = false;
      vm.$http({
        method: "post",
        url: "/api/add_article",
        data: {
          name: vm.form.name,
          author: vm.form.other,
          content: vm.form.content,
          title: vm.form.title,
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
              message: "无此用户 添加失败",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
      vm.form.name = "";
      vm.form.other = "";
      vm.form.content = "";
      vm.form.title = "";
      vm.showArticle();
    },
    setArticle() {
      let vm = this;
      vm.dialogFormVisible2 = false;
      vm.$http({
        method: "post",
        url: "/api/set_article",
        data: {
          id: vm.form2.id,
          content: vm.form2.content,
          title: vm.form2.title,
          author: vm.form2.other,
          name: vm.form2.name,
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
          console.log(err);
        });
      vm.showArticle();
    },
    getArticle(){
      let vm=this;
      vm.title ='';
      let baseurl = '/api/get_article?'
      if(vm.user_name != ''){
        baseurl = baseurl + "author" + "=" + vm.user_name;
      }
      vm.$http({
        method : "get",
        url: baseurl,
      })
      .then((res) => {
          console.log(res);
          vm.tableData = res.data.data.data.map((a) => {
            return {
              user_name2: a.user_name,
              title2: a.title,
              content2: a.content,
              date2: a.create_date,
              other2: a.author,
              id2: a.id_article,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getArticle2(){
      let vm=this;
      vm.user_name ='';
      let baseurl = '/api/get_article?'
      if(vm.title != ''){
        baseurl = baseurl + "title" + "=" + vm.title;
      }
      vm.$http({
        method : "get",
        url: baseurl,
      })
      .then((res) => {
          console.log(res);
          vm.tableData = res.data.data.data.map((a) => {
            return {
              user_name2: a.user_name,
              title2: a.title,
              content2: a.content,
              date2: a.create_date,
              other2: a.author,
              id2: a.id_article,
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
    vm.showArticle();
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
#index2,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
</style>