<template>
  <div class="container">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <aside-item :userId="this.$route.params.author"></aside-item>
      </el-aside>
      <el-main style="height: 100%">
        <div
          class="container_edit"
          style="text-align: left; word-wrap: break-word"
        >
          <div class="person">
            <p style="font-size: 2rem;font-weight:bold">{{title}}</p>
            <p>作者: {{username}}</p>
            <div class="person_bottom">
              <p>更新于: {{update}}</p>
              <p>发表于: {{create}}</p>
            </div>
          </div>
          <mavon-editor
            :value="mdData"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
          ></mavon-editor>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideItem from "@/views/Aside.vue";
export default {
  name: "BlogArticle",

  data() {
    return {
      mdData:"",
      title:"title",
      author:"author",
      update:"update",
      create:"created",
      username:"username"
    };
  },
  components: {
    AsideItem,
  },
  async created() {
    if (this.$route.params.mdData != null) {
      this.mdData = this.$route.params.mdData;
      this.title = this.$route.params.title;
      this.update = this.$route.params.update.substring(0,10);
      this.create = this.$route.params.create.substring(0,10);
      this.author = this.$route.params.author;
      this.username = this.$route.params.username;
    }
  },
  
};
</script>

<style scoped>
.container {
  overflow: auto;
  display: flex;
  height: auto;
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
.container_edit {
  border-radius: 8px;
  position: relative;
  /* background-color: #fff; */
  height: auto;
  min-height: 400px;
  margin-bottom: 2%;
}
.markdown-body {
  border-radius: 8px;
  box-sizing: border-box;
  word-wrap: break-word;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 45px;
  /* box-shadow: rgb(0 0 0 / 10%) 0px 2px 12px 0px; */
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.person {
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 1px 1px rgba(10, 16, 20, 0.12);
  margin: 0% auto;
  width: inherit;
  min-width: 200px;
  max-width: 980px;
  height: 8rem;
  border-radius: 8px;
  background-color: #fff;
}
.person p {
  text-align: center;
  padding-top: 0.8rem;
  
}
.person_bottom {
  margin: 0rem 12rem;
  display: flex;
  justify-content: space-between;
}
.person_bottom p{
  padding-top: 0rem;
}
</style>