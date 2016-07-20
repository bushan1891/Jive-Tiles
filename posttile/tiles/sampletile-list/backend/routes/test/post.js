
var jive = require("jive-sdk");    
  
exports.route = function(req, res){  
  
    var subject = req.body.subject;  
    var message = req.body.message;  
  
    console.log("Inside POST handler");  
    console.log("Subject: "+subject);  
    console.log("Message: "+message);  
  
    res.end('{ "result" : "great job" }');  
};  