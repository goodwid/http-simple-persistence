const fs = require('fs');
const sander = require('sander');
// const mkdirp = require('mkdirp');

var books = Object.create(null);

books.create = function(obj){

  // TODO: Need to check existence of the data directory, create if it doesn't exist

  obj.resource = generateFileName(obj);

  const path = 'data/' + obj.resource + '.json';
  var objJson = JSON.stringify(obj);

  var promise = new Promise( (resolve, reject) =>{

    fs.writeFile(path, objJson, err =>{
      if (err) reject(err);
      else resolve(obj);
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
    .then(resourceArray => resourceArray.map( e => dir + e))
    .then(filePaths => {
      return filePaths.map( p => {
        return sander.readFile(p, {encoding: 'utf-8'});
      });
    })
    .then(filePromises => Promise.all(filePromises))
    .then(jsonItems => jsonItems.map( j => JSON.parse(j)));
  }
};

books.update = function(resource, obj){

  const dir = 'data';
  var path = dir + '/';
  var origPath = path + resource + '.json';
  var newPath = path + obj.resource + '.json';
  var objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then(sander.unlink(origPath))
  .then( () =>{
    return obj;
  });

};

books.delete = function(resource){
  // Return JSON message about resource getting deleted

  const dir = 'data';
  var path = dir + '/';
  var origPath = path + resource + '.json';
  return sander.unlink(origPath)
  .then( () => {
    return {message:'deleted ' + resource};
  });
};

function generateFileName(obj){
  return obj.title.split(' ').join('_') + '_' + obj.pub_year;
}



module.exports = books;
