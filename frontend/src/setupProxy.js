const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/upload',
    createProxyMiddleware({
      target: 'http://52.221.210.220:443',
      changeOrigin: true,
    })
  );
};