import 'isomorphic-fetch'
import { Base64 } from 'js-base64'
import { createFetch, base, parseJSON } from 'http-client'
import fs from 'fs'
import google from 'googleapis'
import GoogleAuth from 'google-auth-library'
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
const filesGet = async fileId => {
  let c = await pCredentials
  let t = await pToken
  let auth = await authorize(c, t)
  return new Promise((resolve, reject) =>
    drive.files.get(
      { auth, fileId },
      (err, res) => err ? reject(err) : resolve(res)
    )
  )
}

const sheetsGet = async (spreadsheetId) => {
  let c = await pCredentials
  let t = await pToken
  let auth = await authorize(c, t)
  return new Promise((resolve, reject) =>
    sheets.spreadsheets.get(
      { auth, spreadsheetId },
      (err, res) => err ? reject(err) : resolve(res)
    )
  )
}



export const loadRoomList = fileId => undefined

export const loadRoom = id => undefined

export const createRoom = room => undefined

export const appendRow = (id, row) => undefined
