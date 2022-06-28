<template>
  <div class="container">

    <div class="content">
      <img :src="imgurl" />
      <div class="show">
        <p style="font-weight: bold; font-size: 1.3rem; padding-bottom: 0.5rem;">{{msg.username}} 评论说：</p>
        <p>{{msg.comment}}</p>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { loadApi } from '@/api';
export default {
  name: 'BlogComment',

  data() {
    return {
      imgurl:''
    };
  },
  props:['msg'],
  async created(){
    const res = await loadApi({ name: this.msg.icon });
    const src = window.URL.createObjectURL(res.data);
    this.imgurl = src;
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 0rem;
  height: 7rem;
  background-color: #fff;

}
img {
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
}
.content {
  padding: 1rem 1rem;
  display: flex;
  position: relative;
  height: 100%;
}
.show {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
}
.show p {
  width: 45rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-align: left;
}
.el-button {
  position: absolute;
  right: 5%;
  top: 25%;
  height: 50%;
}
</style>