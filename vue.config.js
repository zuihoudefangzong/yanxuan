module.exports = {
  // 全局引入scss文件base变量的scss
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/base.scss";'
      }
    }
  },
  // 本地开发环境跨域和隐藏真实后端地址
  devServer: {
    proxy: {
      '/api': {
        target: 'http://yanxuan.xiecheng.live:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 路由懒加载
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
