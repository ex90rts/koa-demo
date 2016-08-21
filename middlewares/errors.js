/**
 * Created by ex90rts on 8/21/16.
 */

module.exports = function(){
  return function *(next){
    try {
      yield next;
    }catch (err){
      var message = err.message || "Unknown Error";
      if (err.status===404){
        message = "Page Not Found";
      }else if(err.status===401){
        message = "Unauthorized";
      }else if (err.status===500){
        message = err.message || "Internal Server Error";
      }

      yield this.render("error", {
        code: err.status,
        message: message
      });
    }
  }
};