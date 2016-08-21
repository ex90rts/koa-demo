/**
 * Created by ex90rts on 8/20/16.
 */


const postModal = require('../modals/post');

module.exports = {
  list: function *(){
    var list = [];
    try{
      list = yield postModal.readList();
    }catch (e){
      this.throw(e);
    }

    yield this.render('index', {
      list: list
    });
  },

  view: function *(){
    var id = this.params.id;
    var post = yield postModal.readPost(id);
    if (!post){
      this.throw(404);
    }

    yield this.render('post', post);
  },

  create: function *(){
    if (this.req.method==='GET') {
      yield this.render('create', {});
    }else{
      var id = new Date().getTime() + (Math.random()+'').substr(-5);
      var postData = this.request.body;
      var post = {
        id: id,
        title: postData.title,
        content: postData.content,
        lastModified: new Date(),
      };

      yield postModal.savePost(id, post);

      var list = yield postModal.readList();
      list.unshift({
        id: id,
        title: post.title,
        lastModified: post.lastModified,
      });

      yield postModal.saveList(list);

      this.redirect("/post/"+id);
    }
  },

  update: function *(){
    var id = this.params.id;
    if (this.req.method==='GET') {
      var post = yield postModal.readPost(id);
      if (!post){
        this.throw(404);
      }

      yield this.render('update', post);
    }else{
      var postData = this.request.body;
      var post = {
        id: id,
        title: postData.title,
        content: postData.content,
        lastModified: new Date(),
      };

      yield postModal.savePost(id, post);

      var listIdx = -1;
      var list = yield postModal.readList();
      list.some(function(item, idx){
        if (item.id === id){
          listIdx = idx;
          return true;
        }
      });

      var listItem = {
        id: id,
        title: post.title,
        lastModified: post.lastModified,
      };
      if (listIdx===-1){
        list.unshift(listItem)
      }else{
        list[listIdx] = listItem;
      }

      yield postModal.saveList(list);

      this.redirect("/post/"+id);
    }
  }
};