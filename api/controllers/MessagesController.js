var Page = 1;


module.exports = {

  getMessage: function(req, res){

    Page = req.param('page') ? req.param('page') : 1;
    var  limit = req.param('limit') || 3;
    Messages.find().paginate({page: Page, limit:limit}).exec(function(err, messages){
      if(err){
        return res.serverError(err);
      }
  
      res.ok(messages);
    })
  },

postMessage: function(req, res){
  var messages = req.allParams();
      messages.page = Page;
  Messages.create(messages).exec(function(err, created){
    if(err){
      return res.json({
        "error": "no"
      })
    }else{
      return res.json({
        "success": 'YES'
      })
    }
  })
}

}
