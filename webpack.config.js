const UglifyEsPlugin = require("uglify-es-webpack-plugin");


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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
