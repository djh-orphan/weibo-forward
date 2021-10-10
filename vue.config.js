module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/duan/' : '/', // 基本路径
  outputDir: 'duan', // 输出文件目录
  assetsDir: "static", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = { //打包文件大小配置
        "maxEntrypointSize": 10000000000,
        "maxAssetSize": 30000000000
      }
    }
  },
  devServer: {
    proxy: {
      '^/api/(.*)$': { // 路径中有 /api 的请求都会走这个代理
        target: 'http://127.0.0.1:5000/', // 要访问的接口域名
        ws: true, // 是否启用  websockets
        // secure: false,
        changeOrigin: true,
        // 开启代理：在本地会创建一个虚拟服务端，
        // 然后发送请求的数据，并同时接收请求的数据，
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api/(.*)$': '$1' // 这里理解成用/api代替target里面的地址，即去掉路径中的/api  的这一截
        }
      }
    }
  }
}
