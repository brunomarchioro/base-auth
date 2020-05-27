let productionPlugins = []

if (process.env.NODE_ENV === 'production') {
  productionPlugins = ['cssnano']
}

module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nested',
    'autoprefixer',
    'postcss-preset-env',
    ...productionPlugins
  ]
}
