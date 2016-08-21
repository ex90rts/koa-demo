/**
 * Created by ex90rts on 8/20/16.
 */
const path = require('path');
const fs = require('fs');
const util = require('util');
const thunkify = require('thunkify-wrap');

const DATA_PATH = path.join(process.cwd(), 'data');

fs.stat = thunkify(fs.stat);
fs.readFile = thunkify(fs.readFile);
fs.writeFile = thunkify(fs.writeFile);

function *fileExists(file){
  try{
    var stats = yield fs.stat(file);
    return stats.isFile();
  }catch (e){
    return false;
  }
}

module.exports = {
  readList: function *(){
    var file = path.join(DATA_PATH, 'list.json');
    var exits = yield fileExists(file);
    if (exits){
      var content = yield fs.readFile(file);
      try{
        return JSON.parse(content);
      }catch(e){
        return [];
      }
    }else{
      return [];
    }
  },

  readPost: function *(id){
    var file = path.join(DATA_PATH, util.format('post-%d.json', id));
    var exits = yield fileExists(file);
    if (exits){
      var content = yield fs.readFile(file);
      try{
        return JSON.parse(content);
      }catch(e){
        return false;
      }
    }else{
      return false;
    }
  },

  saveList: function *(list){
    var file = path.join(DATA_PATH, 'list.json');
    try{
      return yield fs.writeFile(file, JSON.stringify(list), {flag: 'w+'});
    }catch(e){
      return false;
    }
  },

  savePost: function *(id, post){
    var file = path.join(DATA_PATH, util.format('post-%d.json', id));
    try{
      return yield fs.writeFile(file, JSON.stringify(post), {flag: 'w+'});
    }catch (e){
      return false;
    }
  }
};