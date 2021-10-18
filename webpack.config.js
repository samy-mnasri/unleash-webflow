module.exports = {
  target: 'web',
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    library: 'webflawless'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      }
    ]
  }
}
