module.exports = {
  entry: './index.js',
  output: {
    library: {
      name: 'webflawless',
      type: 'umd'
    },
    filename: 'main.js',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: 'production'
}
