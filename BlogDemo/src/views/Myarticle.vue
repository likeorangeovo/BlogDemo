<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <aside-item :userId="this.$store.state.userId"></aside-item>
      </el-aside>

      <el-container>
        <el-main>
          <article-item
            v-for="item in listData"
            :artdata="item"
            :key="item.id"
            @delete="changeList"
          ></article-item>
        </el-main>
        <el-footer
          ><el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="this.$store.state.total"
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
  name: "BlogMyarticle",

  data() {
    return {
      pagesize: 5,
      currentpage: 1,
      listData: [],
      timer: null,
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
        userId: this.$store.state.userId,
      });
      // console.log(res);
      this.listData = res.data.data.records;
    },
    changeList() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const res = await requestArticleApi({
          page: this.currentpage,
          pageSize: this.pagesize,
          userId: this.$store.state.userId,
        });
        console.log(res);
        this.listData = res.data.data.records;
        this.$store.commit('changeTotal', Number(res.data.data.total));
        this.$forceUpdate();
      }, 2000);
    },
  },

  async created() {
    const res = await requestArticleApi({
      page: this.currentpage,
      pageSize: this.pagesize,
      userId: this.$store.state.userId,
    });
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