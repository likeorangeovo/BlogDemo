<!--
 * @Descripttion: 
 * @version: 
 * @Author: likeorange
 * @Date: 2022-06-18 13:28:13
 * @LastEditors: likeorange
 * @LastEditTime: 2022-09-07 12:37:05
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
  background: url("http://shaking.link:888/images/background.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  overflow-y: scroll;
}
</style>
