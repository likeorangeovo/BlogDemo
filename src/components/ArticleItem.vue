<template>
  <div class="container" @click="handleClick">
    <img
      :src="this.showurl"
      alt=""
    />
    <div class="message">
      <p class="title" v-html="artdata.name"></p>
      <p class="article" v-html="artdata.content"></p>
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
      showurl:'',
      imgurl:[
        'http://shaking.link:888/images/%20(1).jpg',
        'http://shaking.link:888/images/%20(2).jpg',
        'http://shaking.link:888/images/%20(3).jpg',
        'http://shaking.link:888/images/%20(4).jpg',
        'http://shaking.link:888/images/%20(5).jpg',
        'http://shaking.link:888/images/%20(6).jpg',
        'http://shaking.link:888/images/%20(7).jpg',
        'http://shaking.link:888/images/%20(8).jpg',
        'http://shaking.link:888/images/%20(9).jpg',
        'http://shaking.link:888/images/%20(10).jpg',
        'http://shaking.link:888/images/%20(11).jpg',
        'http://shaking.link:888/images/%20(12).jpg',
        'http://shaking.link:888/images/%20(13).jpg',
        'http://shaking.link:888/images/%20(14).jpg',
        'http://shaking.link:888/images/%20(15).jpg',
        'http://shaking.link:888/images/%20(16).jpg',
        'http://shaking.link:888/images/%20(17).jpg',
        'http://shaking.link:888/images/%20(18).jpg',
        'http://shaking.link:888/images/%20(19).jpg',
        'http://shaking.link:888/images/%20(20).jpg',
        'http://shaking.link:888/images/%20(21).jpg',
        'http://shaking.link:888/images/%20(22).jpg',
        'http://shaking.link:888/images/%20(23).jpg',
        'http://shaking.link:888/images/%20(24).jpg',
        'http://shaking.link:888/images/%20(25).jpg',
        'http://shaking.link:888/images/%20(26).jpg',
        'http://shaking.link:888/images/%20(27).jpg',
        'http://shaking.link:888/images/%20(28).jpg',
        'http://shaking.link:888/images/%20(29).jpg',
        'http://shaking.link:888/images/%20(30).jpg',
        'http://shaking.link:888/images/%20(31).jpg',
        'http://shaking.link:888/images/%20(32).jpg',
        'http://shaking.link:888/images/%20(33).jpg',
        'http://shaking.link:888/images/%20(34).jpg',
        'http://shaking.link:888/images/%20(35).jpg',
        'http://shaking.link:888/images/%20(36).jpg',
        'http://shaking.link:888/images/%20(37).jpg',
        'http://shaking.link:888/images/%20(38).jpg',
        'http://shaking.link:888/images/%20(39).jpg',
        'http://shaking.link:888/images/%20(40).jpg',
        'http://shaking.link:888/images/%20(41).jpg',
        'http://shaking.link:888/images/%20(42).jpg',
        'http://shaking.link:888/images/%20(43).jpg',
        'http://shaking.link:888/images/%20(44).jpg',
        'http://shaking.link:888/images/%20(45).jpg',
        'http://shaking.link:888/images/%20(46).jpg',
        'http://shaking.link:888/images/%20(47).jpg',
      ]
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
          artid:this.artdata.id
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
          categoryId: this.artdata.categoryId,
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
  created(){
    const num = Math.floor(Math.random()*this.imgurl.length);
    this.showurl = this.imgurl[num]
  }
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