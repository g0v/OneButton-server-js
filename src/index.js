import 'babel-polyfill'
import koa from 'koa'
import qs from 'koa-qs'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import * as typeform from './typeform'
import path from 'path'
import config from '../config.js'

let app = module.exports = qs(koa())
let port = process.env.PORT || 8080

if (!module.parent) {
  typeform.init(config.TYPEFORM.hub)
    .then(function (cxt) {
      console.log('server is listening on port ' + port)
      console.log(cxt)
      app
        .use(bodyParser())
        .use(json())
        .use(route.put('/typeform', typeform.put))
        .use(route.get('/typeform', typeform.get))
        .use(route.post('/typeform', typeform.post))
        .use(route.get('/oauth', function *() {
          this.body = this.query;
        }))
        .listen(port);
    })
    .catch(console.error.bind(console))
}
