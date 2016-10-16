import 'isomorphic-fetch'
import { Base64 } from 'js-base64'
import { base, body, json, method, parseText, parseJSON, createFetch } from 'http-client'
import fs from 'fs'
import path from 'path'

let apiPath= 'https://ethercalc.org/_'
let snapshot = fs.readFileSync(path.resolve(__dirname, './empty.sc'))

// :: String -> Promise [{ id: String, form: Form }]
export const loadRoomList = async rid => {
  let { textString: sc } =
    await createFetch(
      base(apiPath + '/' + rid),
      method('GET'),
      parseText()
    )()
  let ret = []
  let r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(\w+)\ncell:C(?:\d+):t:(.+)\n/g
  let m, id, sid, form
  while ((m = r.exec(sc)) !== null) {
    id = m[1]
    sid = m[2]
    form = JSON.parse(Base64.decode(m[3]))
    ret.push({ id, sid, form })
  }
  return ret
}

// :: String -> Promise (Map String Result)
export const loadRoom = async rid => {
  let { textString: sc } =
    await createFetch(
      base(apiPath + '/' + rid),
      method('GET'),
      parseText()
    )()
  let ret = {}
  let r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(.+)\n/g
  let m, key, value;
  while ((m = r.exec(sc)) !== null) {
    key = m[1]
    value = JSON.parse(Base64.decode(m[2]))
    ret[key] = value
  }
  return ret
}

// :: String -> Promise String
export const createRoom = async room => {
  let res =
    await createFetch(
      base(apiPath),
      json({ room, snapshot }),
      method('POST'),
      parseText()
    )()
  return res.textString.replace('/', '')
}

// :: (String, [String]) -> Promise String
export const appendRow = async (id, row) => {
  let res =
    await createFetch(
      base(apiPath + '/' + id),
      body(row.join(','), 'text/csv'),
      method('POST'),
      parseJSON()
    )()
  return res.jsonData
}
