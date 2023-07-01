const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "..", "..", "src", "content", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: "ts-loader",
          options: {
              configFile: path.resolve(__dirname, "tsconfig.json")
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "..", "..", "extension", "js", "dist"),
  },
  mode: "production",
};
