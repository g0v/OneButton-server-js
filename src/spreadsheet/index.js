import { Base64 } from 'js-base64'
import init from '../google'
import fs from 'fs'
import { promisify } from '../utils'
import { reduce, zipObj } from 'ramda'
import config from '../../config'



const readFile = promisify(fs.readFile)
const readJSON = (...args) => readFile(...args).then(JSON.parse.bind(JSON))

const pCredentials = readJSON(config.GAPI.secret_path)
const pToken = readJSON(config.GAPI.token_path)
const google = init(pCredentials, pToken)



// :: String -> Promise [{ id: String, form: Form }]
export const loadRoomList = async fileId => {
  let { values } =
    await google.sheets.spreadsheets.values.get(fileId, 'A:B:C', 'ROWS')
  return reduce(
    (acc, [id, sid, data]) => [...acc, { id, sid, form: Base64.decode(data) }],
    [],
    values
  )
}

// :: String -> Promise (Map String Result)
export const loadRoom = async id => {
  let { values: [keys, values] } =
    await google.sheets.spreadsheets.values.get(fileId, 'A:B', 'COLUMNS')
  return zipObj(keys, values)
}

// :: String -> Promise String
export const createRoom = async room => {
  let { fileId } =
    await google.drive.files.copy(config.template, room, config.parent_dir)
  return fileId
}

// :: (String, [String] -> Promise String
export const appendRow = async (id, row) => {
  let { spreadsheetId } =
    await google.drive.files.append(id, 'A1:C1', row)
  return spreadsheetId
}
