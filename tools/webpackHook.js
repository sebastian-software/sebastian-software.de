/* eslint-disable */

const path = require("path")

module.exports = function webpackHook(config, {
  isServer,
  isClient,
  isProduction,
  isDevelopment
}) {
  config.resolveLoader = {
    modules: [
      'node_modules',
      path.resolve(__dirname, '..', 'loaders')
    ],
    // extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"]
  }

  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: "html-loader"
      },
      {
        loader: "markdown-loader",
      },
      {
        loader: "ssoft-blog-loader",
        options: {
          type: "content"
        }
      }
    ]
  })

  config.module.rules.unshift({
    test: /\.ssoft$/,
    use: [
      {
        loader: "ssoft-blog-loader",
        options: {
          type: "index"
        }
      }
    ]
  })



  config.module.rules.unshift({
    test: /\.(gif|png|jpe?g)$/i,
    use: [
      {
        loader: 'image-trace-loader'
      },
      {
        loader: "file-loader",
        options: {
          name: isProduction ? "file-[hash:base62:8].[ext]" : "[path][name].[ext]",
          emitFile: isClient
        }
      }
    ]
  })

  return config
}
