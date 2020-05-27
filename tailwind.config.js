module.exports = {
  purge: {
    content: [
      './src/pages/**/*.{js,jsx,ts,tsx}',
      './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    whitelistPatterns: [/fa/, /^html-content/],
    whitelistPatternsChildren: [/fa/, /^html-content/],
  },
  theme: {
    extend: {}
  },
  variants: {
    borderRadius: ['responsive', 'last', 'first']
  },
  plugins: []
}
