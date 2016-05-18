const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('server',() => {
  const request = chai.request(server);
  describe('GET',() => {
    describe('error handling',() => {
      it('without a valid endpoint returns a 404 status code.', done => {
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

      it('/books returns a list of available resources', done => {
        request
          .get('/books')
          .end((err,res) => {
            assert.equal(res.statusCode, 200);
            assert.isArray(JSON.parse(res.text));
            done();
          });
      });

      it('/books/resource returns the data for that resource', done => {
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
      it('without valid data returns a 400 status code.', done => {
        request
          .post('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 400);
            assert.ok(res.text);
            done();
          });
      });
    });
    describe('operations', () => {
      var testData =  {
        'title' : 'Gone With The Wind',
        'author' : 'Margaret Mitchell',
        'genre' : 'fiction',
        'pub_year' : 1964,
        'read' : false
      };
      it('/books returns JSON data with resource added', done => {
        request
          .post('/books')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(testData))
          .end((err,res) => {
            var result = JSON.parse(res.text);
            assert.equal(res.statusCode, 201);
            assert.isObject(result);
            assert.property(result, 'resource');
            done();
          });
      });
    });


  });




  after(done => {
    server.close(done);
  });

});
