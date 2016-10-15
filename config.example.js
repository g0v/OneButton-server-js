import path from 'path'

export default {
  GAPI: {
    "secret_path": path.join(__dirname, "client_secret.json"),
    "token_path": path.join(__dirname, ".gapi-token.json"),
    "parent_dir": "",
    "template": "",
    "hub": ""
  },
  TYPEFORM: {
    "hub": ""
  }
}
