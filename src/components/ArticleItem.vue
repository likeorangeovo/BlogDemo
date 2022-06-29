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
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615820198/blog/%E9%A6%96%E9%A1%B5/v2-7e99c72876b50237b72ca4f8a393cf55_720w_yjmjfx.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615819637/blog/%E9%A6%96%E9%A1%B5/v2-8d6aaa767ec5f0dad922bb3cf11b3847_r_k3cbcc.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615024800/blog/%E9%A6%96%E9%A1%B5/topm_vacxce.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1623160276/bimage/v2-270b7e00013a57461cf6f1b6ddf846e6_720w_fzvqvi.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615031053/blog/v2-5f7cb7e900b9dcf5354c3d4d2c5cc3c2_720w_hydvll.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615031053/blog/v2-023dea2a5198795d4344deb9ee5bb020_720w_hjvnjh.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615030005/blog/v2-946a282c299f5b927eb5790a23b04de5_r_je3wgb.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615030005/blog/v2-37cd97b322e52240e2b85c6ff67edad2_r_o3dafb.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615030005/blog/topm1_ixbm7c.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615031054/blog/v2-963d6056156430c5dde501dafc37d1e2_720w_juwuyq.jpg',
        'https://vip1.loli.io/2022/05/25/Nlgqm3wzAQPieX1.jpg',
        'https://vip2.loli.io/2022/05/25/erTYAV4EwqZ62nx.jpg',
        'https://vip1.loli.io/2022/05/25/Rv2d9m1li3qo5bz.jpg',
        'https://vip1.loli.io/2022/05/15/H5UcQTNpvPtxEb3.jpg',
        'https://vip2.loli.io/2022/05/15/HfXUVhxeNpvBwsq.jpg',
        'https://vip2.loli.io/2022/05/15/JD9es1PX5am3FGr.jpg',
        'https://vip2.loli.io/2022/05/15/pXnyuUx4o7qivHb.jpg',
        'https://vip2.loli.io/2022/05/09/iCL9GxptQmJ5fB6.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1655904319/blog/icecream_c6amf8.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615030006/blog/v2-bee41bb2de490aa839553cb3d0db0cfd_720w_hqkxd6.jpg',

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
  created(){
    const num = Math.floor(Math.random()*20);
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