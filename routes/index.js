/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * The process for adding a user
 */

var users = require('../lib/users');

exports.process = function (req, res) {
  var id   = req.params.id;
  var user = findUser(req);

  if (users.checkUser(user)) {
    users.addUser(user); 
  }
  else {
    
    };

  }
  
};
  
function userData(req) {
  var user;
  if (req.method === 'GET') {
    user = {
      username: req.query.username,
      password : req.query.password,

    };
  }
  else {
    user = {
      username: req.body.username,
      password : req.body.pasword,
    };
  }
  
  return user;
}
