import { Base64 } from 'js-base64'
//import * as backend from '../ethercalc'
import * as backend from '../spreadsheet'
import { keys } from 'ramda'

// XXX: lame
let hubId
let forms = {}
let sheets = {}
let results = {}

export const init = hid => {
  let _loadAll = ([{ id, sid, form } = {}, ...rs]) =>
    id && id !== undefined && sid && sid !== undefined
      ? backend.loadRoom(sid)
          .then(room => {
            forms[id] = JSON.parse(form)
            sheets[id] = sid
            results[id] = room
            return _loadAll(rs)
          })
      : Promise.resolve(true)

  hubId = hid

  return backend.loadRoomList(hid)
    .then(_loadAll)
    .then(() => ({ hubId, forms, sheets, results }));
}

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

  let sid = yield backend.createRoom(id)
  yield backend.appendRow(hubId, [id, sid, Base64.encode(JSON.stringify(form))])
  forms[id] = form
  sheets[id] = sid
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

  yield backend.appendRow(sheets[uid], [token, Base64.encode(JSON.stringify(result))])
  results[uid][token] = result
}

export const get = function *() {
  this.body = keys(forms)
};

export const getForm = function *(uid) {
  if (!forms[uid]) {
    this.status = 404
    return
  }
  this.body = forms[uid]
}

export const getFormResultList = function *(uid) {
  if (!results[uid]) {
    this.status = 404
    return
  }
  this.body = keys(results[uid])
}

export const getFormResult = function *(uid, token) {
  if (!results[uid]) {
    this.status = 404
    return
  }
  const rs = results[uid]
  if (!rs[token]) {
    this.status = 404
    return
  }
  this.body = JSON.parse(Base64.decode(rs[token]))
};
