<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <aside-item :userId="this.$store.state.userId"></aside-item>
      </el-aside>
      <el-main>
        <div class="search">
          <el-input placeholder="请输入内容" v-model="content">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchContent"
            ></el-button>
          </el-input>
        </div>
        <article-item
          v-for="item in listData"
          :artdata="item"
          :key="item.id"
        ></article-item>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideItem from "@/views/Aside.vue";
import ArticleItem from "@/components/ArticleItem.vue";
import { searchApi } from "@/api";
export default {
  name: "BlogSearch",

  data() {
    return {
      content: "",
      listData: [],
    };
  },
  components: {
    AsideItem,
    ArticleItem,
  },
  methods: {
    async searchContent() {
      const res = await searchApi({ keywords: this.content });
      this.listData = res.data.data;
      console.log(res);
      if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: "error",
        });
      }
    },
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
.search {
  display: flex;
  font-size: 30px;
  margin-bottom: 3%;
}
</style>