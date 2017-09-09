const path = require("path");

const srcPath = path.resolve(__dirname, "client/app");
const destPath = path.resolve(__dirname, "dest");

const config = {
  entry: srcPath + "/index.js",
  output: {
    path: destPath,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: srcPath,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = config;