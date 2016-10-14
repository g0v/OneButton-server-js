import 'isomorphic-fetch'
import { Base64 } from 'js-base64'
import { base, body, json, method, parseText, createFetch } from 'http-client'
import fs from 'fs'
import path from 'path'

let apiPath= 'https://ethercalc.org/_'
let snapshot = fs.readFileSync(path.resolve(__dirname, './empty.sc'))

export const loadRoomList = id =>
  createFetch(
    base(apiPath + '/' + id),
    method('GET'),
    parseText()
  )()
    .then(res => {
      let ret = []
      let sc = res.textString
      let r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(.+)\n/g
      let m, id, form
      while ((m = r.exec(sc)) !== null) {
        id = m[1]
        form = JSON.parse(Base64.decode(m[2]))
        ret.push({ id, form })
      }
      return ret
    })

export const loadRoom = id =>
  createFetch(
    base(apiPath + '/' + id),
    method('GET'),
    parseText()
  )()
    .then(function(res) {
      let ret = {}
      let sc = res.textString
      let r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(.+)\n/g
      let m, key, value;
      while ((m = r.exec(sc)) !== null) {
        key = m[1]
        value = JSON.parse(Base64.decode(m[2]))
        ret[key] = value
      }
      return ret
    })

export const createRoom = room =>
  createFetch(
    base(apiPath),
    json({ room, snapshot }),
    method('POST'),
    parseText()
  )();

export const appendRow = (id, csv) =>
  createFetch(
    base(apiPath + '/' + id),
    body(csv, 'text/csv'),
    method('POST'),
    parseText()
  )();
