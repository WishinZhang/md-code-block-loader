const path = require('path')

module.exports = {
  devServer: {
    port: 2333
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader',
              options: {}
            },
            {
              loader: path.resolve(__dirname, './lib/index'),
              options: {
                emoji: true,
                classPrefix: 'markdown-prefix',
                // mdUse: (md) => {
                //   console.log(md)
                // },
                wrapBlock: 'BlockWrap',
                wrapClass: 'markdown-wrap'
              }
            }
          ]
        }
      ]
    }
  }
}
