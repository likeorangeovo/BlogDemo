<template>
  <div>
     <div class="container" style="box-shadow: 0 2px 5px rgb(0 0 0 / 30%)">
    <div class="title">
      <p style="font-weight:bold">公告</p>
    </div>
    <div class="notice">
      <p>山高路远，看世界，也找自己</p>
    </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "BlogNotice",

  data() {
    return {};
  },
};
</script>

<style  scoped>

*{
  margin: 0;
  padding: 0;
}
.container{
  margin-top: 10%;
  background-color: #FFF;
  border-radius: 8px;
}
.title{
  padding: 5% 5% 0% 5%;
}
.notice{
  padding: 5% 5%;
  font-size: 00.8rem;
  text-align: left;
}
</style>