import * as path from "path";
import * as HTMLWebpackPlugin from "html-webpack-plugin";

const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    app: { import: path.resolve(__dirname, "..", "client", "index.ts"), dependOn: ["pixi"] },
    pixi: ["pixi.js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "..", "..", "dist"),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "..", "client", "index.html"),
    }),
  ],
};

export default config;
