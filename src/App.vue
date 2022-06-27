<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'BlogApp',

  data() {
    return {
      
    };
  },

  // created(){ 
  //       if(this.$router.path != '/home'){
  //           this.$router.replace('/home')
  //       }
  //   }

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  background: url("https://res.cloudinary.com/chengchengcheng/image/upload/v1655904591/blog/r_zv1nok.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  overflow-y: scroll;
}
</style>
