var config  = require('../config/index');
function MyPlugin(options) {
  // Configure your plugin with options...
  this.env = options.env;
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  var that = this;
  compiler.hooks.compilation.tap('MyPlugin', compilation => {
  //  compiler.plugin('compilation', function(compilation) {

    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('convertFilePathBeforeProcess', (htmlPluginData, cb) => {
     // Do stuff
     // console.log(htmlPluginData.assets)
     cb(null, htmlPluginData);
    })

    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('onvertFilePathAfterProcess', (htmlPluginData, cb) => {
     // Do stuff
     // console.log(htmlPluginData.assets)
     if(htmlPluginData.html.indexOf('__curentEnv_') === -1){
        throw new Error('环境占位符查找失败 ，检查index.html文件中的环境占位符是否设置成功！');
     }
     htmlPluginData.html = htmlPluginData.html.split('__curentEnv_').join(process.env.NODE_ENV);// nodejs编译时注入环境
     cb(null, htmlPluginData);
    })

  });

};

module.exports = MyPlugin;
