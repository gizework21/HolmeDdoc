module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.REACT_APP_CUSTOM_NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
