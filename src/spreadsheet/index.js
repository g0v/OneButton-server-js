import { Base64 } from 'js-base64'
import init from '../google'
import fs from 'fs-promise'
import { reduce, zipObj } from 'ramda'
import config from '../../config'



const pCredentials = fs.readJson(config.GAPI.secret_path)
const pToken = fs.readJson(config.GAPI.token_path)
const google = init(pCredentials, pToken)



// :: String -> Promise [{ id: String, form: Form }]
export const loadRoomList = async fileId => {
  console.log(`load room list from sheet ${fileId}`)
  let [{ values = [] }] =
    await google.sheets.spreadsheets.values.get(fileId, 'A1:C999', 'ROWS')
  console.log('room list loaded')
  return reduce(
    (acc, [id, sid, data]) => [...acc, { id, sid, form: Base64.decode(data) }],
    [],
    values
  )
}

// :: String -> Promise (Map String Result)
export const loadRoom = async fileId => {
  console.log(`load room from sheet ${fileId}`)
  let [{ values: [keys = [], values = []] = [] }] =
    await google.sheets.spreadsheets.values.get(fileId, 'A1:B999', 'COLUMNS')
  console.log('room loaded')
  return zipObj(keys, values)
}

// :: String -> Promise String
export const createRoom = async room => {
  console.log('create room')
  let [{ fileId }] =
    await google.drive.files.copy(config.template, room, config.parent_dir)
  console.log(`room created at sheet ${fileId}`)
  return fileId
}

// :: (String, [String] -> Promise String
export const appendRow = async (id, row) => {
  console.log('append row')
  let [{ spreadsheetId }] =
    await google.sheets.spreadsheets.values.append(id, 'A1:C1', row)
  console.log(`row appended to sheet ${spreadsheetId}`)
  return spreadsheetId
}
