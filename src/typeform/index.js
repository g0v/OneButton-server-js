var Base64 = require('js-base64').Base64;
var ethercalc = require('../ethercalc');

// XXX: lame
var hubId;
var forms = {};
var results = {};

var init = function(hid) {
  var _loadAll = function(roomList) {
    var obj = roomList[0] || {};
    var id = obj.id;
    var form = obj.form;
    var rs = roomList.slice(1);
    return id !== undefined
      ? ethercalc.loadRoom(id)
          .then(function (room) {
            // XXX: should serialize forms first
            forms[id] = form;
            results[id] = room;
            return _loadAll(rs);
          })
      : Promise.resolve(true);
  };

  hubId = hid;

  return ethercalc.loadRoomList(hid)
    .then(_loadAll)
    .then(function () {
      return {
        hubId: hubId,
        forms: forms,
        results: results
      };
    });
};

var put = function *() {
  var form = this.request.body;
  var id = form.id;

  if (
    !this.request.is('json') ||
    id === undefined
  ) {
    this.status = 400;
    return;
  }

  yield ethercalc.appendRow(hubId, id + ',' + Base64.encode(JSON.stringify(form)));
  forms[id] = form;
  console.log('form ' + id + ' registered');

  res = yield ethercalc.createRoom(id);
  console.log('https://ethercalc.org' + res.textString + ' created');
  results[id] = {};
  this.body = null;
  this.status = 201;
}

var post = function *() {
  var result = this.request.body;
  var uid = result.uid;
  var token = result.token;

  if (
    !this.request.is('json') ||
    uid === undefined ||
    token === undefined
  ) {
    this.status = 400;
    return;
  }

  this.body = null;

  if (!results[uid]) {
    results[uid] = {};
    this.body = { warning: 'missing form: ' + uid };
  }

  console.log('result ' + token + ' of form ' + uid + ' received');
  yield ethercalc.appendRow(uid, token + ',' + Base64.encode(JSON.stringify(result)));
  console.log('row appended');
  results[uid][token] = result;
};

var get = function *() {
  this.body = {
    hubId: hubId,
    forms: forms,
    results: results
  };
};

module.exports = {
  init: init,
  put: put,
  get: get,
  post: post
};
