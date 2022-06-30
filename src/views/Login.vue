<template>
  <div class="container">
    <!-- 头部 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      router
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="timeline">时间轴</el-menu-item>
      <el-menu-item index="classify">分类</el-menu-item>
      <el-submenu index="">
        <template slot="title">文章</template>
        <el-menu-item index="edit">文章编辑</el-menu-item>
        <el-menu-item index="myarticle">我的文章</el-menu-item>
      </el-submenu>
      <el-menu-item index="search">搜索</el-menu-item>
      <el-menu-item index="follow">关注</el-menu-item>
    </el-menu>

    <!-- 登录表单 -->
    <el-container class="LoginContainer">
      <el-main class="LoginFormBack">
        <el-form
          style="width: 330px"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="on"
        >
          <h3 class="title" style="padding-bottom: 20px">博客管理</h3>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              auto-complete="on"
              placeholder="username"
            />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="password"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item prop="password" v-if="register == 1">
            <el-input
              :type="pwdType"
              v-model="loginForm.repassword"
              name="password"
              auto-complete="on"
              placeholder="password"
              @input="check"
            >
              <template slot="suffix">
                <p>{{ hint }}</p>
              </template></el-input
            >
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item v-if="register == 0">
            <el-button
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleLogin"
            >
              Sign in
            </el-button>
          </el-form-item>

          <!-- 注册 -->
          <el-form-item v-if="register == 1">
            <el-button
              type="primary"
              style="width: 100%"
              @click.native.prevent="handleRegister"
            >
              Register
            </el-button>
          </el-form-item>

          <div class="tips">
            <!-- <span style="margin-right: 20px" @click="selectlogin">username: admin</span>
            <span @click="selectregister"> password: admin</span> -->
            <el-button type="text" @click.native="selectlogin">登录</el-button>
            <el-button type="text" @click.native="selectregister"
              >注册</el-button
            >
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { LoginBlogApi } from "@/api";
import { registerApi } from "@/api";
export default {
  name: "BlogLogin",

  data() {
    return {
      activeIndex: "1",
      login: this.$store.state.logined,
      register: 0,
      hint: "",
      errormsg:"",

      loginForm: {
        username: "",
        password: "",
        repassword: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      pwdType: "password",
      redirect: undefined,
    };
  },

  methods: {
    async handleLogin() {
      if (!this.checkForm(1)) {
        this.$message.error(this.errormsg);
        return;
      }

      const res = await LoginBlogApi(JSON.stringify(this.loginForm));
      if (res.data.code == 1) {
        this.$store.commit("changelogin", 1);
        this.$store.commit("changeUserId", res.data.data.id);
        this.$store.commit("changeImgId", res.data.data.icon);
        this.$store.commit("changeUsername", res.data.data.username);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        this.$router.push("/home");
        // console.log(res)
        // console.log('------------------')
        // console.log(JSON.parse(localStorage.getItem("userInfo")));
      } else {
        this.$alert(res.data.msg, "提示", {
          confirmButtonText: "确定",
        });
      }
    },

    async handleRegister() {
      if (!this.checkForm(0)) {
        this.$message.error(this.errormsg);
        return;
      }

      const res = await registerApi(
        JSON.stringify({
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
      );
      if (res.data.code == 1) {
        this.$alert("注册成功，请登录", "提示", {
          confirmButtonText: "确定",
        });
        this.$router.push("/login");
      } else {
        console.log(res);
        this.$alert(res.data.msg, "提示", {
          confirmButtonText: "确定",
        });
      }
    },
    selectlogin() {
      this.register = 0;
    },
    selectregister() {
      this.register = 1;
    },
    check() {
      if (this.loginForm.password !== this.loginForm.repassword) {
        this.hint = "密码不匹配";
      } else {
        this.hint = "";
      }
    },

    // 表单校验
    checkForm(isLogin) {
      // 1.校验必填项
      let validForm = false;
      this.$refs["loginForm"].validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        this.errormsg = "填写信息不符合要求！";
        return false;
      }
      //2.校验两次密码是否一致
      if (this.loginForm.password !== this.loginForm.repassword && isLogin == 0) {
        this.errormsg = "密码不一致！";
        return false;
      }

      return true;
    },
  },

  async destroyed() {},
};
</script>

  

<style scoped>
.container {
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.title {
  margin-bottom: 30px;
}
.el-menu {
  padding-left: 3%;
  box-shadow: 0 5px 6px -5px rgb(133 133 133 / 60%);
  /* background-color: aqua; */
}
.el-menu p {
  position: absolute;
  top: 30%;
  right: 10%;
  font-size: inherit;
  font-weight: bold;
  color: #909399;
  /* background-color: aqua; */
}

.LoginContainer {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 30px;
}

.LoginFormBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 60px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  width: 600px;
}
</style>