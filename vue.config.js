module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/global.scss";',
      },
    },
    sourceMap: true,
  },
  configureWebpack: {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(doc|pdf|docx)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/files/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
  // devServer: {
  //   proxy: {
  //     '/api_webhook': {
  //       target: 'http://stage.datalesson.ru/trainer/webhook',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api_webhook': ''
  //       }
  //     }
  //   }
  // }
}
