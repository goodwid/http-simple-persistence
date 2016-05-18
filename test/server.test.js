const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('server error handling',() => {
  const request = chai.request(server);

  it('get without a valid endpoint returns a 404 status code.', done => {
    request
      .get('/test')
      .end((err,res) => {
        assert.equal(res.statusCode, 400);
        assert.ok(res.text);
        done();
      });
  });

  after(done => {
    server.close(done);
  });
});

describe.skip('server operations', () => {
  const request = chai.request(server);

  it('get to /notes returns a list of available resources', done => {
    request
      .get('/notes')
      .end((err,res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });

  it('get to /notes/resource returns the data for that resource', done => {
    request
      .get('/notes')
      .end((err,res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
  });



  after(done => {
    server.close(done);
  });


});
