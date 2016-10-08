var koa = require('koa');
var route = require('koa-route');
var bodyParser = require('koa-bodyparser');
var json = require('koa-json');
var app = module.exports = koa();
var typeform = require('./typeform');
var path = require('path');
var config = require(path.resolve(__dirname, '../config.js'));

var port = process.env.PORT || 8080;

if (!module.parent) {
  typeform.init(config.TYPEFORM.hub)
    .then(function (cxt) {
      console.log('server is listening on port ' + port);
      console.log(cxt);
      app
        .use(bodyParser())
        .use(json())
        .use(route.put('/typeform', typeform.put))
        .use(route.get('/typeform', typeform.get))
        .use(route.post('/typeform', typeform.post))
        .listen(port);
    })
    .catch(console.error.bind(console));
}
