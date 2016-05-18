const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('server',() => {
  const request = chai.request(server);
  describe('GET',() => {
    describe('error handling',() => {
      it('get without a valid endpoint returns a 404 status code.', done => {
        request
          .get('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 404);
            assert.ok(res.text);
            done();
          });
      });
    });

    describe('operations', () => {

      it('get to /books returns a list of available resources', done => {
        request
          .get('/books')
          .end((err,res) => {
            assert.equal(res.statusCode, 200);
            assert.isArray(JSON.parse(res.text));
            done();
          });
      });

      it('get to /notes/resource returns the data for that resource', done => {
        request
          .get('/books/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 200);
            assert.isObject(JSON.parse(res.text));
            done();
          });
      });
    });
  });

  describe('POST',() => {
    describe('error handling',() => {
      it('POST without valid data returns a 400 status code.', done => {
        request
          .post('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 400);
            assert.ok(res.text);
            done();
          });
      });
    });


  });




  after(done => {
    server.close(done);
  });

});
