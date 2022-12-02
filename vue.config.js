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
}
