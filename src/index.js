var koa = require('koa');
var route = require('koa-route');
var bodyParser = require('koa-bodyparser');
var json = require('koa-json');
var app = module.exports = koa();
var typeform = require('./typeform');

app
  .use(bodyParser())
  .use(json())
  .use(route.put('/typeform', typeform.put))
  .use(route.get('/typeform', typeform.get))
  .use(route.post('/typeform', typeform.post));

var port = process.env.PORT || 8080;

if (!module.parent) {
  console.log('server is listening on port ' + port);
  app.listen(port);
}
