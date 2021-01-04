module.exports = {
  devServer: {
    proxy: 'http://ttapi.research.itcast.cn/'
  },
  // 标题title
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        val.options.title = '黑马头条管理系统'
      }
    })
  }
}
