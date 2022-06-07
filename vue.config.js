const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false       /* 当遇到模板未使用等编译错误时，加入该配置项 */
})
