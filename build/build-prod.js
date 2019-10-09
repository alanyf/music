require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var http = require('http')
var fs = require('fs')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var utils = require('./utils')

var spinner = ora('building for production...')
spinner.start()



/*  var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb();
  });
}; */

var pack = function() {
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
      console.log(chalk.yellow('\nstart copy static file...\n'));
      // 拷贝静态文件
      utils.copyFile(path.resolve(__dirname, '../static'), path.resolve(__dirname, '../dist'));
    })
};

pack()

/* var dest = path.resolve(__dirname, '../offline/vhtml/vue.prod.js');
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  rm(dest, err => {
      if (err) throw err
      download('http://bqq.gtimg.com/vhtml/latest/vue.prod.js', dest, pack)
  })
}) */
