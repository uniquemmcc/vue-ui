const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const cdn = {
 
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@2.8.1/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js",

  ]
}
module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",

    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'admin',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: cdn
    }
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://localhost:3000'
  }
}