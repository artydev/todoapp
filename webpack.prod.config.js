const UglifyEsPlugin = require("uglify-es-webpack-plugin");

/* https://github.com/unassert-js/webpack-unassert-loader */

module.exports = {
  optimization: {
    minimizer: [
      new UglifyEsPlugin({
        compress: {
          drop_console: true,

        },
        mangle: {
          properties: false
        }
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      { test: /\.js$/, loader: "webpack-unassert-loader" }
    ],
  },

};
