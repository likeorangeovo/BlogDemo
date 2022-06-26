<template>
  <div class="container">
    <el-main>
      <el-form
        ref="form"
        label-width="100px"
        style="max-width: 800px"
      >
        <!-- 个人信息 -->
        <el-avatar
          :src="imgurl"
        ></el-avatar>

        <el-form-item label="账号">
          <el-input
            v-model="account"
            required
            placeholder="请输入你的账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="password"
            required
            placeholder="不少于5位"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="change">立刻创建</el-button>
          <el-upload
            :action="loadurl"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :show-file-list="true"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { loadApi } from "@/api";
import {updateUserApi} from "@/api"
export default {
  name: "blogUser",
  data() {
    return {
      account:'',
      id:'',
      password:'',
      fileList: [],
      loadurl: "/api/file/upload",
      imgurl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
  },
  methods: {
    handleRemove() {
      this.$message.error("删除成功");
    },
    handleExceed() {
      this.$message.error("请删除后重新上传");
    },
   async handleSuccess(response) {
      console.log(response.msg);
      this.id = response.msg;
      const res = await loadApi({name:this.id});
      const src = window.URL.createObjectURL(res.data)
      console.log(src)
      this.imgurl = src
    },
    async change(){
      const res = await updateUserApi({username:this.username,password:this.password,icon:this.id})
      this.$store.commit('changeImgId', this.id);
      let temp = JSON.parse(window.localStorage.userInfo)
      temp.icon = this.id;
      let str = JSON.stringify(temp)
      window.localStorage.setItem('userInfo',str);
      this.$message(res.data.msg);
    }
  },
};
</script>

<style scoped>
.el-main {
  margin: 5% auto;
  width: 80%;
  padding-top: 0%;
  padding-bottom: 0%;
  /* background-color: #e9eef3; */
  color: #333;
}
.el-form {
  margin: 5% auto;
  text-align: right;
}

.el-avatar {
  width: 5rem;
  height: 5rem;
  margin-bottom: 1%;
}
.load {
  display: flex;
  flex-direction: row-reverse;
}
</style>