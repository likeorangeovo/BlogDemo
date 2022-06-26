
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <aside-item :userId="this.$store.state.userId"></aside-item>
      </el-aside>
      <el-main>
        <el-tree
          class="filter-tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          highlight-current
          ref="tree"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ data }" class="span__">
            <i class="el-icon-s-promotion"></i>
            <span class="tree-node-span">{{ data.label }}</span>
          </span>
        </el-tree>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AsideItem from "@/views/Aside.vue";
import { classifyApi } from "@/api";
export default {
  name: "BlogClassify",

  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data.isleaf != null) {
        // console.log("---");
        // console.log(data)
        this.$router.push({
          name: "article",
          params: {
            mdData: data.mdData,
            create: data.create,
            update: data.update,
            title: data.title,
            author: data.author,
          },
        });
      }
    },
    toTree(arr) {
      for (let i of arr) {
        let child = [];
        for (let j of i.articleList) {
          child.push({ label: j.name, isleaf: 1, mdData: j.content,
            create: j.createTime,
            update: j.updateTime,
            title: j.name,
            author: j.userId })
        }
        this.data.push({ label: i.name, children: child });
      }
    },
  },
  components: {
    AsideItem,
  },

  async created() {
    const res = await classifyApi();
    // console.log(res);
    this.toTree([...res.data.data]);
    // console.log('121321412421')
  },
};
</script>

<style scoped>
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
  background-color: #fff;
  color: #333;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
.el-icon-caret-right:before {
  display: none;
}
.el-tree-node__content {
  height: 36px;
  border-radius: 8px;
  padding-left: 36px;
}
.el-icon-s-promotion:before {
  margin-right: 2em;
  color: #49b1f5;
}
</style>