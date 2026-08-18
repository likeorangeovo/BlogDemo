<!-- 侧边栏文件 -->
<template>
  <div>
    <!-- 个人信息展示 -->
    <div class="container" style="box-shadow: 0 2px 5px rgb(0 0 0 / 30%)">
      <div class="show">
        <el-avatar :src="imgurl" :size="100"></el-avatar>
        <p style="margin: 20px">{{ this.$store.state.onesay }}</p>
      </div>

      <div class="link">
        <div class="circle"><a href="https://github.com/">Git</a></div>
        <div class="circle"><a href="https://gitee.com/">码</a></div>
        <div class="circle"><a href="https://www.zhihu.com/">知</a></div>
      </div>

      <div class="sum">
        <p style="font-weight: bold">{{ total }}</p>
        <p>文章</p>
      </div>

      <el-button round @click="changeFollow" v-if="this.userId != this.$store.state.userId"
        ><p v-if="this.followed == -1">关注</p>
        <p v-else>取消关注</p>
      </el-button>
    </div>
    <!-- 公告 -->
    <notice-item></notice-item>
  </div>
</template>

<script>
import NoticeItem from "@/components/Notice";
import { loadApi, showUserApi } from "@/api";
import { followUserApi } from "@/api";
import { unfollowUserApi } from "@/api";

export default {
  name: "BlogAside",
  data() {
    return {
      imgurl: "",
      imgId: "default_img.jpg",
      total: 0,
      followed: -1,
    };
  },

  components: {
    NoticeItem,
  },

  props: ["userId"],

  async created() {
    if (this.$store.state.logined == 1) {
      const msg = await showUserApi({ userId: this.userId });
      console.log(msg);
      this.total = Number(msg.data.data.articleNum);
      this.imgId = msg.data.data.icon;
      const follow = msg.data.data.followedUser;
      localStorage.setItem('total',msg.data.data.articleNum)
      this.judgeFollow(follow);
      // console.log(this.followed);
    }
    const res = await loadApi({ name: this.imgId });
    const src = window.URL.createObjectURL(res.data);
    this.imgurl = src;
  },

  methods: {
    judgeFollow(list) {
      for (let i of list) {
        if (this.$store.state.userId == i.id) {
          this.followed = 1;
          break;
        }
      }
    },

    async changeFollow() {
      if (this.followed == 1) {
        try {
          const res = await unfollowUserApi(this.userId);
          this.followed = -this.followed;
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          console.log(res.data.msg);
        } catch (error) {
          this.$message.error("操作失败，请重试");
        }
      } else {
        try {
          const res = await followUserApi(this.userId);
          this.followed = -this.followed;
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          // console.log(res.data.msg);
        } catch (error) {
          this.$message.error("操作失败，请重试");
        }
      }
    },
  },

  watch: {
  "$store.state.total":{
    handler:function(newVal){
      this.total = newVal
    }
  }
}

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  margin-top: 0%;
  background-color: #fff;
  border-radius: 8px;
}
.show {
  padding: 8% 5% 0% 5%;
}
.show p {
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: inherit;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: left;
}
.show img {
  width: 50%;
  border-radius: 50%;
  background-color: aquamarine;
}
.link {
  margin: 5% 5%;
  overflow: hidden;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.circle {
  width: 17%;
  height: 100%;
  border-radius: 50%;
  background-color: #a0daff;
}
.circle a {
  display: inline-block;
  margin-top: 15%;
  text-decoration-line: none;
  color: azure;
}
.sum {
  padding-bottom: 5%;
}
.el-button {
  margin-bottom: 1rem;
}
</style>