<template>
  <div class="container">
    <div class="content">
      <img :src="circleUrl" />
      <div class="show">
        <p style="font-weight: bold" @click="jump">{{ this.userlist.username }}</p>
        <p>{{ this.userlist.createTime }}</p>
      </div>
      <el-button round @click="changeFollow"
        ><p v-if="this.followed == -1">关注</p>
        <p v-else>取消关注</p>
      </el-button>
    </div>
  </div>
</template>

<script>
import { followUserApi } from "@/api";
import { unfollowUserApi } from "@/api";
import { loadApi } from "@/api";
export default {
  name: "BlogPersonlist",
  data() {
    return {
      circleUrl:
        "https://res.cloudinary.com/chengchengcheng/image/upload/v1615819637/blog/%E9%A6%96%E9%A1%B5/v2-8d6aaa767ec5f0dad922bb3cf11b3847_r_k3cbcc.jpg",
      followed: 1,
    };
  },
  props: ["userlist"],
  methods: {
    async changeFollow() {
      if (this.followed == 1) {
        try {
          const res = await unfollowUserApi(this.userlist.id);
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
          const res = await followUserApi(this.userlist.id);
            this.followed = -this.followed;
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            console.log(res.data.msg);
          
        } catch (error) {
          this.$message.error("操作失败，请重试");
        }
      }
    },

    jump(){
      this.$router.push({
        name:'userarticle',
        params: {
          userId:this.userlist.id,
          imgId:this.userlist.icon
        },
      })
    }
  },

  async created(){
    const res = await loadApi({ name: this.userlist.icon })
    const src = window.URL.createObjectURL(res.data);
    this.circleUrl =  src
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 0.5rem;
  height: 7rem;
  background-color: #fff;
  border-radius: 8px;
}
img {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
.content {
  padding: 1rem 1rem;
  display: flex;
  position: relative;
  height: 100%;
}
.show {
  display: flex;
  flex-direction: column;
  margin-left: 3%;
}
.show p {
  margin-top: 1rem;
  width: 45rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.el-button {
  position: absolute;
  right: 5%;
  top: 25%;
  height: 50%;
}
</style>