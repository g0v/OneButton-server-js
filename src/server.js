import 'babel-polyfill'
import koa from 'koa'
import qs from 'koa-qs'
import spa from 'koa-spa'
import send from 'koa-send'
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
      console.log(`server is listening on port ${port} with context:`)
      console.log(JSON.stringify(cxt, null, 2))
      app
        .use(bodyParser())
        .use(json())
        .use(route.put('/typeform', typeform.put))
        .use(route.get('/typeform', typeform.get))
        .use(route.get('/typeform/:uid', typeform.getForm))
        .use(route.get('/typeform/:uid/result', typeform.getFormResultList))
        .use(route.get('/typeform/:uid/result/:token', typeform.getFormResult))
        .use(route.post('/typeform', typeform.post))
        .use(route.get('/oauth', function *() {
          this.body = this.query;
        }))
        .use(route.get('/slide', function *() {
          return send(this, this.path, { root: path.join(__dirname, '../slide') })
        }))
        .use(spa(path.join(__dirname, '../'), {
          index: 'index.html'
        }))
        .listen(port);
    })
    .catch(console.error.bind(console))
}
