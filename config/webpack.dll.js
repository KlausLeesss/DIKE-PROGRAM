const path = require('path');
const webpack = require('webpack');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    vendors: ["antd", "axios", "bizcharts", "echarts", "echarts-for-react", "hotcss", "immutable", "lodash", "react", "react-dom", "react-media", "react-quill", "react-redux", "react-router", "react-router-dom", "redux", "redux-immutable", "redux-logger", "redux-promise", "redux-saga", "redux-thunk", "reselect", "whatwg-fetch", "react-d3-library"]
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '[name]_dll_lib'
  },
  plugins: [
    new FirendlyErrorePlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll', '[name].manifest.json'),
      name: '[name]_dll_lib'
    })
  ]
};