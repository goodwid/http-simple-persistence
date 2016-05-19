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

books.read = function(resourceArray){
  const dir = 'data/';

  if (resourceArray.length < 1){
    // Given an empty array, returns a list of resources
    return sander.readdir(dir).
    then( fileNames => fileNames.map( e => e.slice(0, -5)));
  }else{

    return sander.readdir(dir)
    .then( totalArray => {
      return totalArray.filter(item => {
        var inArray = false;
        for (var x = 0; x < resourceArray.length; x++){
          if (resourceArray[x] === item.slice(0, -5)) {
            inArray = true;
          }
        }
        return inArray;
      });
    })
    .then( resourceArray => resourceArray.map( e => dir + e))
    .then( filePaths => {
      return filePaths.map( p => {
        return sander.readFile(p, {encoding: 'utf-8'});
      });
    })
    .then(filePromises => Promise.all(filePromises))
    .then( jsonItems => jsonItems.map( j => JSON.parse(j)));
  }
};

books.update = function(){

};

books.delete = function(){

};

function generateFileName(){
  return Date.now();
}



module.exports = books;
