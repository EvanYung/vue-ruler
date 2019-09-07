const modifyVars = require('./modifyVars')
module.exports = {
  publicPath: './',
  lintOnSave: false,
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars
      }
    }
  },
  devServer: {}
}
