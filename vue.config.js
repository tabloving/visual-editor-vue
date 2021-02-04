  
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Vue-Visual-Editor';
        args[0].author = 'liuyang';
        return args
      })
  },
  productionSourceMap:true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-visual-editor/'
    : '/'
}