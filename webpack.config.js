const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname + "/public"),
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: ["node_modules"]
      }
    ]
  }
}