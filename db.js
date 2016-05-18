const fs = require('fs');
const sander = require('sander');
const mkdirp = require('mkdirp');


var books = Object.create(null);

books.create = function(obj){

  // TODO: Need to check existence of the data directory, create if it doesn't exist

  // Assign a unique filename to the book
  obj.filename = generateFileName();

  const path = 'data/' + obj.resource + '.json';
  var objJson = JSON.stringify(obj);

  var promise = new Promise( (resolve, reject) =>{

    fs.writeFile(path, objJson, err =>{
      if (err) reject(err);
      else resolve('arbitrary info');
    });
  });
  return promise;
};

books.read = function(resource){

  // TODO: Test for array with items, empty array, or single object

  const path = 'data/' + resource + '.json';
  var promise = new Promise( (resolve, reject) =>{
    fs.readFile(path, { encoding: 'utf-8'}, (err, data) =>{
      if (err) reject(err);
      else resolve(data);
    });
  });
  return promise;
};

books.update = function(){

};

books.delete = function(){

};

function generateFileName(){
  return Date.now();
}



module.exports = books;
