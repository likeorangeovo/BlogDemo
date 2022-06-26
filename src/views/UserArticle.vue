<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <aside-item :userId="this.$route.params.userId"></aside-item>
      </el-aside>

      <el-container>
        <el-main>
          <article-item
            v-for="item in listData"
            :artdata="item"
            :key="item.id"
          ></article-item>
        </el-main>
        <el-footer
          ><el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="this.total"
          >
          </el-pagination
        ></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";
import AsideItem from "@/views/Aside.vue";
import { requestArticleApi } from "@/api";

export default {
  name: "BlogUserarticle",

  data() {
    return {
      pagesize: 5,
      currentpage: 1,
      listData: [],
      total:0
    };
  },

  components: {
    ArticleItem,
    AsideItem,
  },

  methods: {
    async handleCurrentChange(val) {
      this.currentpage = val;
      const res = await requestArticleApi({
        page: this.currentpage,
        pageSize: this.pagesize,
        userId: this.$route.params.userId,
      });
      // console.log(res);
      this.listData = res.data.data.records;
    },
  },

  async created() {
    const res = await requestArticleApi({
      page: this.currentpage,
      pageSize: this.pagesize,
      userId: this.$route.params.userId,
    });
    this.total = Number(res.data.data.total)
    // console.log(res);
    this.listData = res.data.data.records;
  },
};
</script>

<style scoped>
.container {
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.el-aside {
  margin-top: 3%;
  color: #333;
  text-align: center;
  margin-left: 5%;
}

.el-main {
  margin-top: 3%;
  margin-left: 3%;
  margin-right: 5%;
  padding-top: 0%;
  padding-bottom: 0%;
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
}
.el-footer {
  text-align: center;
}
</style>