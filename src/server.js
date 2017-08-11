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
        .use(route.put('/api/typeform', typeform.put))
        .use(route.get('/api/typeform', typeform.get))
        .use(route.get('/api/typeform/:uid', typeform.getForm))
        .use(route.get('/api/typeform/:uid/result', typeform.getFormResultList))
        .use(route.get('/api/typeform/:uid/result/:token', typeform.getFormResult))
        .use(route.post('/api/typeform', typeform.post))
        .use(route.get('/api/oauth', function *() {
          this.body = this.query;
        }))
        .use(route.get('/api/slide', function *() {
          return send(this, this.path, { root: path.join(__dirname, '../slide') })
        }))
        .use(spa(path.join(__dirname, '../'), {
          index: 'index.html'
        }))
        .listen(port);
    })
    .catch(console.error.bind(console))
}
