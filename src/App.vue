<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">虚拟列表</router-link> |
      <router-link to="/tabView">tab组件</router-link> |
      <router-link to="/dialogView">dialog组件</router-link> |
      <router-link to="/reView">递归组件</router-link>
    </div>
    <keep-alive>
          <router-view/>
    </keep-alive>

  </div>
</template>

<style lang="less">
@import  '~@/assets/icon-font.css';

*{
      margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #2c3e50;
  margin: 0px 20px ;
}

#nav {
  padding: 30px;
 text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
