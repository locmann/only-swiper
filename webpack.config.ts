import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const devServer: DevServerConfiguration = {
  port: 8000,
  open: true
}

const config: webpack.Configuration = {
  devServer: devServer,
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'app', 'main.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: 'as-is',
                auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                localIdentName: '[local]__[hash:base64:5]'
              },

            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
  devtool: 'inline-source-map',

};

export default config;