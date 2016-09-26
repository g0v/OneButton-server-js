var results = {};

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

  if (!results[uid]) {
    results[uid] = {};
  }

  results[uid][token] = result;
  this.body = null;
};

var get = function *() {
  this.body = results;
};

module.exports = {
  get: get,
  post: post
};
