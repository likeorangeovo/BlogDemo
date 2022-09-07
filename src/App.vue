<!--
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-06-18 13:28:13
 * @LastEditors: likeorange
 * @LastEditTime: 2022-09-07 16:06:21
-->
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

  created(){ 
        if(this.$router.path != '/home'){
            this.$router.replace('/home')
        }
    }

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  background: #b8e2d4;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  overflow-y: scroll;
}
</style>
