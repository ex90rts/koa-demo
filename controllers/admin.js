/**
 * Created by ex90rts on 8/21/16.
 */

const adminConfig = require('../config/admin');

module.exports = {
  login: function *(){
    if (this.req.method==='GET'){
      yield this.render('login');
    }else{
      var postData = this.request.body;
      if (postData.username===adminConfig.username && postData.password===adminConfig.password){
        this.session.logged = true;
        this.session.username = postData.username;
        this.redirect('/');
      }else{
        this.throw(500, "Wrong username or password");
      }
    }
  },

  logout: function *(){
    this.session.logged = false;
    this.session.username = null;
    this.redirect('/');
  }
};