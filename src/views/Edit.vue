<template>
  <div>
    <el-container>
      <el-main>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >添加文章标签</el-button
        >

        <div>
          <el-input placeholder="请输入文章题目" v-model="title"> </el-input>
          <el-select v-model="value" placeholder="请选择文章分类">
            <el-option
              v-for="item in options"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <mavon-editor
          v-model="content"
          ref="md"
          style="min-height: 45vw; position: static"
        />
        <el-button
          v-if="edited == 0"
          @click="submit"
          round
          style="width: 50%; margin-top: 1rem"
        >
          提交文章
        </el-button>
        <el-button
          v-else
          @click="change"
          round
          style="width: 50%; margin-top: 1rem"
        >
          修改文章
        </el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { classifyApi } from "@/api";
import { addArticleApi, updateArticleApi } from "@/api";
export default {
  name: "BlogEdit",
  data() {
    return {
      title: "",
      content: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      value: "",
      options: [],
      edited: 0,
      titleId: "",
    };
  },

  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    async submit() {
      const res = await addArticleApi(
        JSON.stringify({
          categoryId: this.value,
          name: this.title,
          content: this.content,
          tagsName: this.dynamicTags,
        })
      );
      if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async change() {
      const res = await updateArticleApi({
        categoryId: this.value,
        name: this.title,
        content: this.content,
        tagsName: this.dynamicTags,
        id: this.titleId,
      });
      if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "success",
        });

      } else {
        this.$message.error(res.data.msg);
      }
    },

    toOption(val) {
      for (let item of val) {
        this.options.push({ value: String(item.id), label: item.name });
      }
    },
  },

  async created() {
    const res = await classifyApi();
    this.toOption(res.data.data);
    if (Object.keys(this.$route.params).length != 0) {
      (this.title = this.$route.params.title),
        (this.content = this.$route.params.content),
        (this.value = String(this.$route.params.categoryId)),
        (this.dynamicTags = this.$route.params.tags),
        (this.edited = 1),
        (this.titleId = this.$route.params.titleId);
    }
  },
};
</script>

<style scoped>
.el-main {
  color: #333;
  text-align: center;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px !important;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-select {
  margin: 1rem 0rem;
}

.el-input {
  width: 50%;
}
</style>