import fs from 'fs-promise'
import google from 'googleapis'
import config from '../config'

export const show = (...args) => console.log(...args) || args[0]

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

const pCredentials = fs.readJson(config.GAPI.secret_path)
const pToken = fs.readJson(config.GAPI.token_path)



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
