import { defineConfig } from 'umi';
const path = require('path');
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@utils': path.resolve(__dirname, './src/utils'),
    '@host': path.resolve(__dirname, './src/host'),
    '@img': path.resolve(__dirname, './src/images'),
    '@config': path.resolve(__dirname, './src/config'),
  },
  define: {
    'process.env': process.env.ENV,
  },
  links: [{ rel: 'icon', href: '/favicon.ico' }],
  proxy: {
    '/my-server': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/my-server': '' },
    },
  },
  dva: {
    immer: true,
    hmr: false,
  },
});
