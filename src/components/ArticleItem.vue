<template>
  <div class="container" @click="handleClick">
    <img
      src="https://res.cloudinary.com/chengchengcheng/image/upload/v1615820198/blog/%E9%A6%96%E9%A1%B5/v2-7e99c72876b50237b72ca4f8a393cf55_720w_yjmjfx.jpg"
      alt=""
    />
    <div class="message">
      <p class="title">{{ artdata.name }}</p>
      <p class="article">{{ artdata.content }}</p>
      <el-button type="primary" plain @click.stop="sendData"
        >阅读全文</el-button
      >
      <el-button
        type="primary"
        plain
        @click.stop="jump"
        v-if="
          this.artdata.userId == this.$store.state.userId &&
          this.$route.name == 'myarticle'
        "
        ><p>编辑文章</p>
      </el-button>
      <el-button
        type="primary"
        plain
        @click.stop="delect"
        v-if="
          this.artdata.userId == this.$store.state.userId &&
          this.$route.name == 'myarticle'
        "
        ><p>删除文章</p>
      </el-button>
    </div>
  </div>
</template>

<script>
import { deleteArticleApi } from "@/api";
export default {
  name: "BlogArticleItem",
  data() {
    return {
      tags: [],
    };
  },
  props: ["artdata"],

  methods: {
    sendData() {
      this.$router.push({
        name: "article",
        params: {
          mdData: this.artdata.content,
          create: this.artdata.createTime,
          update: this.artdata.updateTime,
          title: this.artdata.name,
          author: this.artdata.userId,
          username: this.artdata.username,
        },
      });
      console.log(this.artdata);
    },
    jump() {
      this.$router.push({
        name: "edit",
        params: {
          content: this.artdata.content,
          title: this.artdata.name,
          categoryId: Number(this.artdata.categoryId),
          tags: this.totaglist(this.artdata.tags),
          titleId: this.artdata.id,
        },
      });
    },

    totaglist() {
      for (let item of this.artdata.tags) {
        this.tags.push(item.tagName);
      }
      return this.tags;
    },

    async delect() {
      this.$confirm("是否确认删除？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async () => {
        const res = await deleteArticleApi({ articleId: this.artdata.id });
        if (res.data.code == 1) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.handleClick();
        } else {
          this.$message.error("删除失败，请重试");
        }
      });

    },

    handleClick: function () {
      this.$emit("delete", this.artdata.id);
    },
  },
};
</script>

<style scoped>
.container {
  border-radius: 8px;
  position: relative;
  background-color: #fff;
  height: 15rem;
  margin-bottom: 2%;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
img {
  width: 40%;
  height: 100%;
  overflow: auto;
}
.message {
  position: absolute;
  left: 40%;
  width: 60%;
  height: 100%;
}
.title {
  overflow: hidden;
  display: inline-block;
  margin-top: 3%;
  font-size: 2rem;
  font-weight: bold;
  align-content: left;
}
.article {
  margin: 2% 5%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>