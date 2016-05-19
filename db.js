const sander = require('sander');

const books = Object.create(null);
const dir = 'data';
const path = dir + '/';

books.create = function(obj){

  obj.resource = generateFileName(obj);
  const newPath = path + obj.resource + '.json';
  const objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then( () =>{
    return obj;
  });
};

books.read = function(resourceArray) {

  if (resourceArray.length < 1) {
    // Given an empty array, returns a list of resources
    return sander.readdir(path).
    then( fileNames => fileNames.map( e => e.slice(0, -5)));
  } else {
    return sander.readdir(path)
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
    .then(resourceArray => resourceArray.map( e => path + e))
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

  const origPath = path + resource + '.json';
  const newPath = path + obj.resource + '.json';
  const objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then(sander.unlink(origPath))
  .then( () =>{
    return obj;
  });

};

books.delete = function(resource){

  const origPath = path + resource + '.json';
  return sander.unlink(origPath)
  .then( () => {
    return {message:'deleted ' + resource};
  });
};

function generateFileName(obj){
  return obj.title.split(' ').join('_') + '_' + obj.pub_year;
}

module.exports = books;
