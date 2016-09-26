var koa = require('koa');
var route = require('koa-route');
var bodyParser = require('koa-bodyparser');
var json = require('koa-json');
var app = module.exports = koa();
var typeform = require('./typeform');

app
  .use(bodyParser())
  .use(json())
  .use(route.get('/typeform', typeform.get))
  .use(route.post('/typeform', typeform.post));

if (!module.parent) app.listen(process.env.PORT || 8080);
