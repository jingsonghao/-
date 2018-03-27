
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
//临时
// let target = 'http://nxipt.ng.oofo.org'
let target = 'http://lwipt.zy.qa.dppc.org/'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8880,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/admin/**': {
        // target:  'http://192.168.1.200:9641',
        target:  target,
        changeOrigin: true
      },
      '/auth/**': {
        target:  target,
        changeOrigin: true
      },
      '/trace-base/**': {
        target:  target,
        changeOrigin: true
      },
      '/trace-code/**': {
        target:  target,
        changeOrigin: true
      },
      '/trace-supervise/**': {
        target:  target,
        changeOrigin: true
      },
      '/home-admin/**': {
        target:  target,
        changeOrigin: true
      },
      '/fileupload/**': {
        target:  target,
        changeOrigin: true
      },
      '/home-web/**': {
        target:  target,
        changeOrigin: true
      },
      '/common-api/**': {
        target:  target,
        changeOrigin: true
      }
    },
    cssSourceMap: false
  }
}
