var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var httpProxy = require('http-proxy');
var _ = require("lodash");

var config = require('./webpack.config');
var proxyConfig = require('./proxy.config');

var app = new require('express')();
var port = <%= port %>;

var proxy = httpProxy.createProxyServer({});

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(function(req, res){
  var service = req.get('x-service');
  if(proxyConfig.hasOwnProperty(service)) {
    var backend = proxyConfig[service];
    var timeout = backend.timeout?backend.timeout:30;
    proxy.web(req, res, {target: _.sample(backend.servers), xfwd:true}, function(error){
      console.log(error);
      res.status(502).json({code:502, error: error});
    });
  }else{
    res.sendFile(__dirname + '/index.html');
  }
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
