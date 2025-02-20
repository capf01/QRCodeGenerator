const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // Garanta que os módulos sejam resolvidos corretamente
        'qrcode': require.resolve('qrcode')  
      }
    }
  }
})
