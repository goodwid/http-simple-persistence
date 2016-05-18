const db = require ('../db.js');
const assert = require('chai').assert;


describe('books module',() => {

  console.log('anything?');

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

    it('returns an object or an error', ( done ) =>{
      db.read('test')
      .then( data =>{
        assert.isOk(data);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });

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
