<template>
  <div class="container">
    <el-menu
      style="box-shadow: 0 2px 5px rgb(0 0 0 / 30%)"
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
        <el-menu-item index="edit">创建文章</el-menu-item>
        <el-menu-item index="myarticle">我的文章</el-menu-item>
      </el-submenu>
      <el-menu-item index="search">搜索</el-menu-item>
      <el-menu-item index="follow">关注</el-menu-item>
      <el-button round v-if="this.$store.state.logined === 0" @click="jump"
        >登录/注册</el-button
      >
      <el-submenu index="showlist" class="avatar" v-else>
        <template slot="title"><el-avatar :src="imgurl"></el-avatar></template>
        <el-menu-item index="user">个人信息</el-menu-item>
        <el-menu-item index=" " @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
import { logOutApi } from "@/api";
import { loadApi } from "@/api";
export default {
  name: "BlogIndex",

  data() {
    return {
      activeIndex: "1",
      userId: this.$store.state.userId,
      imgurl: "",
    };
  },

  methods: {
    jump() {
      this.$router.push("/login");
    },
    handleLogout() {
      this.$confirm("是否确认退出？", "确定退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        const res = await logOutApi();
        if (res.data.code == 1) {
          this.$store.commit("logout");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("total");
          this.$router.push("/login");
        }
      });
    },
  },

  async created() {
    if (this.$store.state.logined == 1) {
      const res = await loadApi({ name: this.$store.state.imgId });
      // console.log(res);
      const src = window.URL.createObjectURL(res.data);
      // console.log(src);
      this.imgurl = src;
    }
  },
};
</script>

<style scoped>
.container {
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.el-menu {
  padding-left: 3%;
  /* background-color: aqua; */
}
.el-menu p {
  position: absolute;
  top: 1.1rem;
  right: 13rem;
  font-size: 1.2em;
  font-weight: bold;
  color: #909399;
  /* background-color: aqua; */
}
.avatar {
  position: absolute;
  right: 6.5rem;
  font-size: 1.2em;
  font-weight: bold;
  color: #909399;
}
.el-button {
  position: absolute;
  top: 15%;
  right: 5%;
  font-size: inherit;
  /* background-color: aqua; */
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>