const assert = require('assert');
const jwt = require('jsonwebtoken');
const restifyjwt = require('../lib');

describe('string tokens', function() {
  const req = {};
  const res = {};

  it('should work with a valid string token', function() {
    const secret = 'shhhhhh';
    const token = jwt.sign('foo', secret);

    req.headers = {};
    req.headers.authorization = 'Bearer ' + token;
    restifyjwt({secret: secret})(req, res, function() {
      assert.equal('foo', req.user);
    });
  });
});
