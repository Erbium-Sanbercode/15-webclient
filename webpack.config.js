const path = require('path');

module.exports = {  
  entry: {
    //main: './src/main.js',    
    //assignment: './src/assignment/main.js',
    worker: "./src/assignment/workers/main.js"
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './www',
    port: 9999,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
