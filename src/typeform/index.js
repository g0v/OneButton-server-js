import { Base64 } from 'js-base64'
import * as ethercalc from '../ethercalc'

// XXX: lame
let hubId
let forms = {}
let results = {}

export const init = hid => {
  let _loadAll = ([{ id, form } = {}, ...rs]) =>
    id !== undefined
      ? ethercalc.loadRoom(id)
          .then(room => {
            // XXX: should serialize forms first
            forms[id] = form
            results[id] = room
            return _loadAll(rs)
          })
      : Promise.resolve(true)

  hubId = hid

  return ethercalc.loadRoomList(hid)
    .then(_loadAll)
    .then(() => ({
      hubId: hubId,
      forms: forms,
      results: results
    }));
};

export const put = function *() {
  let form = this.request.body
  let id = form.id

  if (
    !this.request.is('json') ||
    id === undefined
  ) {
    this.status = 400
    return
  }

  yield ethercalc.appendRow(hubId, id + ',' + Base64.encode(JSON.stringify(form)))
  forms[id] = form
  console.log('form ' + id + ' registered')

  id = yield ethercalc.createRoom(id)
  console.log('https://ethercalc.org/' + id + ' created')
  results[id] = {}
  this.body = null
  this.status = 201
}

export const post = function *() {
  var result = this.request.body
  var uid = result.uid
  var token = result.token

  if (
    !this.request.is('json') ||
    uid === undefined ||
    token === undefined
  ) {
    this.status = 400
    return
  }

  this.body = null

  if (!results[uid]) {
    results[uid] = {}
    this.body = { warning: 'missing form: ' + uid }
  }

  console.log('result ' + token + ' of form ' + uid + ' received')
  yield ethercalc.appendRow(uid, [token, Base64.encode(JSON.stringify(result))])
  console.log('row appended', res)
  results[uid][token] = result
};

export const get = function *() {
  this.body = {
    hubId: hubId,
    forms: forms,
    results: results
  };
};
