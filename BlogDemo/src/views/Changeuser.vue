<template>
  <div class="container">
    <el-main style="width: 100%; height: 100%; overflow: hidden">
      <el-form
        ref="form"
        label-width="100px"
        style="width: 30vw; text-align: center; height: 70vh; overflow: hidden"
      >
        <!-- 个人信息 -->
        <el-avatar :src="imgurl"></el-avatar>

        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="username"
            required
            placeholder="请输入要修改的用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            show-password
            v-model.trim="password"
            required
            placeholder="请输入要修改的密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button type="primary" @click="change" style=""
            >立即修改</el-button
          >
          <el-upload
            style="margin-top: 40px"
            :action="loadurl"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :show-file-list="true"
            :on-success="handleSuccess"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { loadApi, showUserApi, logOutApi } from "@/api";
import { updateUserApi } from "@/api";
export default {
  name: "blogUser",
  data() {
    return {
    
      username: "",
      account: "",
      id: this.$store.state.imgId,
      password: "",
      fileList: [],
      loadurl: "/api/file/upload",
      imgurl: "",
      imgId: "",

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
      const res = await loadApi({ name: this.id });
      const src = window.URL.createObjectURL(res.data);
      console.log(src);
      this.imgurl = src;
    },
    change() {
      this.$confirm("是否确认修改？", "确定修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        console.log(this.$store.state.imgId)
        const res = await updateUserApi({
          username: this.username,
          password: this.password,
          icon: this.id,
        });
        if (res.data.code == 1) {
          this.$store.commit("changeImgId", this.id);
          let temp = JSON.parse(window.localStorage.userInfo);
          temp.icon = this.id;
          let str = JSON.stringify(temp);
          window.localStorage.setItem("userInfo", str);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          const res1 = await logOutApi();
          if (res1.data.code == 1) {
            this.$store.commit("logout");
            localStorage.removeItem("userInfo");
            this.$router.push("/login");
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
  },
  async created() {
    if (this.$store.state.logined == 1) {
      const msg = await showUserApi({ userId: this.$store.state.userId });
      // console.log(msg);
      this.imgId = msg.data.data.icon;
      // console.log(this.followed);
    }
    const res = await loadApi({ name: this.imgId });
    const src = window.URL.createObjectURL(res.data);
    this.imgurl = src;
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
  margin-left: 100px;
}
.load {
  display: flex;
  flex-direction: row-reverse;
}
</style>