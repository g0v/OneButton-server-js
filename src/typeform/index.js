var forms = {};
var results = {};

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

  console.log('form ' + id + ' registered');
  forms[id] = form;
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
  results[uid][token] = result;
};

var get = function *() {
  this.body = results;
};

module.exports = {
  put: put,
  get: get,
  post: post
};
