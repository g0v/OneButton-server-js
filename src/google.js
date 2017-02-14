import google from 'googleapis'
import GoogleAuth from 'google-auth-library'
import thenify from 'thenify'

const drive = google.drive('v3')
const sheets = google.sheets('v4')

const authorize = (credentials, token) => {
  if (!credentials || ! credentials.installed) {
    throw new Error('wrong credentials. did you create a web application instead of an installed application?')
  }
  if (!token) {
    throw new Error('missing argument: token')
  }

  let { client_secret, client_id, redirect_uris } = credentials.installed
  let auth = new GoogleAuth()
  let oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[0])
  oauth2Client.credentials = token

  return oauth2Client
}

const driveFilesCopy = thenify(drive.files.copy)
const sheetsValuesGet = thenify(sheets.spreadsheets.values.get)
const sheetsValuesAppend = thenify(sheets.spreadsheets.values.append)



export default (pCredentials, pToken) => ({
  drive: {
    files: {
      copy: async (fileId, name, dirId) => {
        let c = await pCredentials
        let t = await pToken
        let auth = authorize(c, t)
        return driveFilesCopy({
          auth,
          fileId,
          resource: {
            name,
            parents: [dirId]
          }
        })
      }
    }
  },
  sheets: {
    spreadsheets: {
      values: {
        get: async (spreadsheetId, range, majorDimension) => {
          let c = await pCredentials
          let t = await pToken
          let auth = authorize(c, t)
          return sheetsValuesGet({
            auth,
            spreadsheetId,
            range,
            majorDimension
          })
        },
        append: async (spreadsheetId, range, row) => {
          let c = await pCredentials
          let t = await pToken
          let auth = authorize(c, t)
          return sheetsValuesAppend({
            auth,
            spreadsheetId,
            valueInputOption: 'RAW',
            range,
            resource: { range, values: [row] }
          })
        }
      }
    }
  }
})
