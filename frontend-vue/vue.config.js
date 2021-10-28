module.exports = {
  devServer: {
    proxy: {
      "^/api-go": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
};
