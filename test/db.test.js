const db = require ('../db.js');
const assert = require('chai').assert;


describe('books module',() => {

  describe('on create', () =>{

    it('returns an object', () =>{

    });

    it('writes to json file', ( done ) =>{
      db.create({resource:'herbook'})
      .then(data => {
        assert.isOk(data);
        done();
      })
      .catch(error =>{
        assert.isOk(error);
        done();
      });
    });

  });

  describe('on read', () =>{

    it('returns an array of objects when given an array of resources', ( done ) =>{
      db.read(['test', 'herbookxx'])
      .then( data =>{
        assert.equal(data.length, 2);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });

    });


    it('returns an array of resources when given an empty array', (done) =>{
      db.read([])
      .then( data =>{
        assert.isOk(data instanceof Array);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });
    });

    describe('on update', () =>{

      it('returns an object', () =>{
      });

    });

    describe('on delete', () =>{

      it('returns an array', () =>{
      });

    });
  });
});
