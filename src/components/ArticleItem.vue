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
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1655904319/blog/icecream_c6amf8.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1615030006/blog/v2-bee41bb2de490aa839553cb3d0db0cfd_720w_hqkxd6.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/9_dydvdx.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493081/ourBlog/8_kptsws.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493081/ourBlog/7_lotvim.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/6_cpqbkm.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493081/ourBlog/5_ydhoyr.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493080/ourBlog/4_wdfsci.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493080/ourBlog/4_ormmci.png',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493088/ourBlog/45_lp2i9y.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493088/ourBlog/44_j8nxxi.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493088/ourBlog/43_ehgzux.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493087/ourBlog/42_i0znh7.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493087/ourBlog/41_vker0a.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493086/ourBlog/40_vyi9hs.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493079/ourBlog/3_xs7l3r.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493080/ourBlog/3_dilo30.png',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493086/ourBlog/39_dbkbim.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493087/ourBlog/38_ulwmwr.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493086/ourBlog/37_eed7gz.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493089/ourBlog/36_gjxgts.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493086/ourBlog/35_emtshm.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493085/ourBlog/34_id9u6u.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493085/ourBlog/33_u9u16b.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/32_rppdgx.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/31_vrke5k.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/30_ogduy1.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493079/ourBlog/2_xmzakf.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493078/ourBlog/2_uuyluz.png',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493079/ourBlog/2_te9cih.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/29_zchdhi.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/28_spzxau.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/27_jn4x54.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493084/ourBlog/26_gngzaw.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/25_xnracg.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/24_uh82h0.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/23_halsde.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/22_wfnhfa.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/21_cp5dc3.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493081/ourBlog/1_yrytv6.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493079/ourBlog/1_xvisnr.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493080/ourBlog/1_vaq7hn.png',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/19_f31bge.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/18_ycoilk.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/17_atd0u9.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/16_ljidyt.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493083/ourBlog/15_smlvcr.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/14_i4oajx.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/13_r1hjzb.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/12_pphfuj.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493082/ourBlog/11_hgum1i.jpg',
        'https://res.cloudinary.com/chengchengcheng/image/upload/v1656493081/ourBlog/10_t6hppc.jpg',


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