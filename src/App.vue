<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">tab组件</router-link> |
      <router-link to="/dialogView">dialog组件</router-link> |
      <router-link to="/vistualView">虚拟列表</router-link> |     
      <router-link to="/reView">递归组件</router-link>
    </div>
    <keep-alive>
          <router-view/>
    </keep-alive>

  </div>
</template>

<style lang="less">
@import  '~@/assets/iconfont/iconfont.css';

*{
      margin: 0;
    padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #2c3e50;
  padding: 0px 50px ;
  box-sizing: border-box;
  user-select: none;
   width: 100%;
  height: 100%;
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
