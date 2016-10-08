require('es6-promise').polyfill();
require('isomorphic-fetch');
var Base64 = require('js-base64').Base64;
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

var loadRoomList = function(id) {
  return createFetch(
    base(apiPath + '/' + id),
    method('GET'),
    parseText()
  )()
    .then(function(res) {
      var ret = [];
      var sc = res.textString;
      var r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(.+)\n/g;
      var m, id, form;
      while ((m = r.exec(sc)) !== null) {
        id = m[1];
        form = JSON.parse(Base64.decode(m[2]));
        ret.push({ id: id, form: form });
      }
      return ret;
    });
}

var loadRoom = function(id) {
  return createFetch(
    base(apiPath + '/' + id),
    method('GET'),
    parseText()
  )()
    .then(function(res) {
      var ret = {};
      var sc = res.textString;
      var r = /cell:A(?:\d+):t:(\w+)\ncell:B(?:\d+):t:(.+)\n/g
      var m, key, value;
      while ((m = r.exec(sc)) !== null) {
        key = m[1];
        value = JSON.parse(Base64.decode(m[2]));
        ret[key] = value;
      }
      return ret;
    })
}

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
  loadRoomList: loadRoomList,
  loadRoom: loadRoom,
  createRoom: createRoom,
  appendRow: appendRow
};
