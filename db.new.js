const sander = require('sander');
const things = Object.create(null);
const dir = 'data';
const path = dir + '/';

// Create directory if it doesn't already exist.
const testFile = `${path}foo.txt`;
sander.writeFile(testFile,'text')
  .then(() => sander.unlink(testFile));

things.create = function(obj){
  return generateId()
  .then ( id => {
    obj.id = id;
    const newPath = path + obj.id + '.json';
    const objJson = JSON.stringify(obj);
    return sander.writeFile(newPath, objJson)
    .then( () =>{
      return obj;
    });
  });
};

things.readAll = function() {
  return sander.readdir(path)
  .then(files => files.map(file => path + file))
  .then(filePaths => filePaths.map(file => sander.readFile(file, {encoding: 'utf-8'})))
  .then(data => Promise.all(data));
};

things.readOne = function(id) {
  return sander.readdir(path)
  .then(files => files.map(file => file.split('.')[0]))
  .then(filenames => {
    if (filenames.indexOf(id) > -1) {
      return sander.readFile(path + id + '.json', {encoding: 'utf-8'});
    } else {
      return Promise.reject(`Unable to locate ${id}`);
    }
  });
};

things.update = function(id, obj){
  const origPath = path + id + '.json';
  const newPath = path + obj.id + '.json';
  const objJson = JSON.stringify(obj);

  return sander.writeFile(newPath, objJson)
  .then(sander.unlink(origPath))
  .then( () =>{
    return obj;
  });
};

things.delete = function(id){
  const origPath = path + id + '.json';
  return sander.unlink(origPath)
  .then( () => {
    return {message:'deleted ' + id};
  });
};

function generateId(){
  return sander.readdir(path)
    .then(fileNames => {
      const ids = fileNames.map(file => file.replace(/\.[^/.]+$/, ''));
      return ids.length ? Math.max.apply(0, ids) + 1 : 1;
    });
}

module.exports = things;
