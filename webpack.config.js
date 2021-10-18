module.exports = {
  target: 'web',
  entry: './index.js',
  output: {
    filename: 'main.js',
    library: 'webflawless',
    libraryTarget: 'var'
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
