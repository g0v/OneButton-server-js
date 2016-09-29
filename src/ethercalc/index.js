require('es6-promise').polyfill();
require('isomorphic-fetch');
var httpClient = require('http-client');
var base = httpClient.base;
var body = httpClient.body;
var json = httpClient.json;
var method = httpClient.method;
var parseText = httpClient.parseText;
var createFetch = httpClient.createFetch;
var fs = require('fs');
var path = require('path');

var apiPath= 'https://ethercalc.org/_'
var snapshot = fs.readFileSync(path.join(__dirname, './empty.sc'));

var createRoom = function(room) {
  return createFetch(
    base(apiPath),
    json({ room, snapshot }),
    method('POST'),
    parseText()
  )();
}

var appendRow = function(id, csv) {
  return createFetch(
    base(apiPath + '/' + id),
    body(csv, 'text/csv'),
    method('POST'),
    parseText()
  )();
}

module.exports = {
  createRoom: createRoom,
  appendRow: appendRow
};
