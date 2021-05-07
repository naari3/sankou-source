import * as path from "path";
import * as HTMLWebpackPlugin from "html-webpack-plugin";
import * as CopyFilePlugin from "copy-webpack-plugin";

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: path.resolve(__dirname, "..", "client", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "..", "..", "dist"),
    publicPath: "/",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "..", "client", "index.html"),
    }),
    new CopyFilePlugin({ patterns: [{ from: "public", to: "." }] }),
  ],
};

export default config;
