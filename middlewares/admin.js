/**
 * Created by ex90rts on 8/21/16.
 */
module.exports = function (){
  return function *(next) {
    if (this.session.logged){
      this.locals._logged = true;
      this.locals._username = this.session.username;
    }else{
      this.locals._logged = false;
    }

    if (/^\/admin\//.test(this.path) && !this.session.logged){
      this.throw(401);
    }

    yield next;
  }
};