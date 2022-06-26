<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <aside-item :userId="this.$store.state.userId"></aside-item>
      </el-aside>
      <el-container>
        <el-main>
          <list-item v-for="item in userlist" :key="item.id" :userlist="item"></list-item>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import AsideItem from "@/views/Aside.vue";
import ListItem from "@/components/Personlist.vue"
import { followApi } from "@/api";


export default {
  name: "BlogFollow",
  data() {
    return {
      userlist: [],
    };
  },
  components: {
    AsideItem,
    ListItem
  },

  async created(){
    const res = await followApi();
    this.userlist = res.data.data;
  }

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