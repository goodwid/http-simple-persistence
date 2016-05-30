const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('server',() => {
  const request = chai.request(server);
  const testGetData =  {
    'title' : 'Time Enough For Love',
    'author' : 'Robert Heinlein',
    'genre' : 'Science Fiction',
    'pub_year' : 1973,
    'read' : true
  };
  const testPostData =  {
    'title' : 'Gone With The Wind',
    'author' : 'Margaret Mitchell',
    'genre' : 'fiction',
    'pub_year' : 1964,
    'read' : false
  };
  const testPutData = {
    'title' : 'Gone With The Wind',
    'author' : 'Margaret Mitchell',
    'genre' : 'fiction',
    'pub_year' : 1964,
    'read' : false,
    'resource' : 'Gone_With_The_Wind_1964'
  };
  const testResource = 'Gone_With_The_Wind_1964';


  describe('GET',() => {
    describe('error handling',() => {
      it('without a valid endpoint returns a 404 status code', done => {
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

      // populating DB with data to retrieve
      before(done => {
        request
          .post('/books')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(testGetData))
          .end(() => done());
      });

      it('/books returns a list of available resources', done => {
        request
          .get('/books')
          .end((err,res) => {
            assert.equal(res.statusCode, 200);
            assert.propertyVal(res.header,'content-type','application/json');
            let results = JSON.parse(res.text);
            assert.isArray(results);
            assert.isAtLeast(results.length, 1);
            done();
          });
      });

      it('/books/resource returns the data for that resource', done => {
        request
          .get('/books/gone_with_the_wind_1964')
          .end((err,res) => {
            assert.equal(res.statusCode, 200);
            assert.propertyVal(res.header,'content-type','application/json');
            assert.isArray(JSON.parse(res.text));
            done();
          });
      });
    });
  });

  describe('POST',() => {
    describe('error handling',() => {
      it('without a valid endpoint returns a 400 status code', done => {
        request
          .post('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 400);
            assert.propertyVal(res.header,'content-type','text/plain');
            assert.ok(res.text);
            done();
          });
      });
    });
    describe('operations', () => {
      it('/books returns JSON data with resource added', done => {
        request
          .post('/books')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(testPostData))
          .end((err,res) => {
            var result = JSON.parse(res.text);
            assert.equal(res.statusCode, 201);
            assert.propertyVal(res.header,'content-type','application/json');
            assert.isObject(result);
            assert.property(result, 'resource');
            assert.propertyVal(result, 'genre', testPostData.genre);
            done();
          });
      });
    });
  });

  describe('PUT',() => {
    describe('error handling',() => {
      it('without a valid endpoint returns a 400 status code', done => {
        request
          .put('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 400);
            assert.propertyVal(res.header,'content-type','text/plain');
            assert.ok(res.text);
            done();
          });
      });
    });

    describe('operations', () => {
      it('/books/resource returns the updated item', done => {
        request
          .put('/books/'+testResource)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(testPutData))
          .end((err,res) => {
            var result = JSON.parse(res.text);
            assert.equal(res.statusCode, 201);
            assert.propertyVal(res.header,'content-type','application/json');
            assert.isObject(result);
            assert.property(result, 'resource');
            done();
          });
      });
    });
  });

  describe('DELETE',() => {
    describe('error handling',() => {
      it('without a valid endpoint returns a 400 status code.', done => {
        request
          .delete('/test')
          .end((err,res) => {
            assert.equal(res.statusCode, 400);
            assert.ok(res.text);
            done();
          });
      });
    });

    describe('operations', () => {
      it('/books/resource returns the deletion notification', done => {
        request
          .delete('/books/'+testResource)
          .set('Content-Type', 'application/json')
          .end((err,res) => {
            var result = JSON.parse(res.text);
            assert.equal(res.statusCode, 201);
            assert.isOk(result);
            done();
          });
      });
    });
  });

  describe('invalid method',() => {

    it('sending PATCH request generates 405 error', done => {
      request
        .patch('/books')
        .end((err,res) => {
          assert.equal(res.statusCode, 405);
          assert.propertyVal(res.header,'content-type','text/plain');
          assert.ok(res.text);
          done();
        });
    });
  });




  after(done => {
    server.close(done);
  });

});
