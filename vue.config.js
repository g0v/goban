const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  runtimeCompiler: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
      }
    }
  },
  pwa: {
    workboxOptions: {
      exclude: [/\.gitkeep/]
    }
  },
  productionSourceMap: true,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
})
