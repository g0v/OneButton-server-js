import 'isomorphic-fetch'
import { Base64 } from 'js-base64'
import { createFetch, base, parseJSON } from 'http-client'
import fs from 'fs'
import google from 'googleapis'
import GoogleAuth from 'google-auth-library'
import { reduce, zipObj } from 'ramda'
import config from '../../config'



// utils
const show = (...args) => console.log(...args) || args[0]
const readFile = filepath => new Promise((resolve, reject) =>
  fs.readFile(filepath, (err, content) =>
    err ? reject(err) : resolve(content))
)
const readJSON = filepath => readFile(filepath).then(JSON.parse.bind(JSON))



// Google APIs
const drive = google.drive('v3')
const sheets = google.sheets('v4')

const authorize = (credentials, token) => new Promise((resolve, reject) => {
  if (!credentials || ! credentials.installed) {
    return reject(new Error('wrong credentials. did you create a web application instead of an installed application?'))
  }
  if (!token) {
    return reject(new Error('missing argument: token'))
  }

  let { client_secret, client_id, redirect_uris } = credentials.installed
  let auth = new GoogleAuth()
  let oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[0])
  oauth2Client.credentials = token

  return resolve(oauth2Client)
})

const pCredentials = readJSON(config.GAPI.secret_path)
const pToken = readJSON(config.GAPI.token_path)



// wrappers
const filesCopy = async (fileId, name, dirId) => {
  let c = await pCredentials
  let t = await pToken
  let auth = await authorize(c, t)
  return new Promise((resolve, reject) =>
    drive.files.copy(
      {
        auth,
        fileId,
        resource: {
          name,
          parents: [dirId]
        }
      },
      (err, res) => err ? reject(err) : resolve(res)
    )
  )
}

const sheetsValuesGet = async (spreadsheetId, range, majorDimension) => {
  let c = await pCredentials
  let t = await pToken
  let auth = await authorize(c, t)
  return new Promise((resolve, reject) =>
    sheets.spreadsheets.values.get(
      { auth, spreadsheetId, range, majorDimension },
      (err, res) => err ? reject(err) : resolve(res)
    )
  )
}

const sheetsValuesAppend = async (spreadsheetId, range, row) => {
  let c = await pCredentials
  let t = await pToken
  let auth = await authorize(c, t)
  return new Promise((resolve, reject) =>
    sheets.spreadsheets.values.append(
      { auth, spreadsheetId, range, values: [row] },
      (err, res) => err ? reject(err) : resolve(res)
    )
  )
}



// :: String -> Promise [{ id: String, form: Form }]
export const loadRoomList = async fileId => {
  let { values } = await sheetsValuesGet(fileId, 'A:B:C', 'ROWS')
  return reduce(
    (acc, [id, sid, data]) => [...acc, { id, sid, form: Base64.decode(data) }],
    [],
    values
  )
}

// :: String -> Promise (Map String Result)
export const loadRoom = async id => {
  let { values: [keys, values] } = await sheetsValuesGet(fileId, 'A:B', 'COLUMNS')
  return zipObj(keys, values)
}

// :: String -> Promise String
export const createRoom = async room => {
  let { fileId } = await filesCopy(config.template, room, config.parent_dir)
  return fileId
}

// :: (String, [String] -> Promise String
export const appendRow = async (id, row) => {
  let { spreadsheetId } = await sheetsValuesAppend(id, 'A1:C1', row)
  return spreadsheetId
}
