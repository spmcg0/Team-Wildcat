var db_users = require('../lib/db_users');

exports.search = function (req, res) {
  var uname = req.query.uname;
  var pword = req.query.pword;
  var u;
  db_users.getUser(uname, pword, function (error, user){
      if (error){
        res.redirect('/login');
      } else {
        u = user;
      }
  });

  var search_uname = req.query.search_uname;
  var results;
  db_users.getSearchResults(search_uname, function (error, users){
    results = users;
    res.render('search', { user : u, users : results, search : search_uname })
  });
  
};

exports.follow = function (req, res) {
  var current_uname = req.body.current_uname;
  var current_pword = req.body.current_pword;
  var current_user;
  var user_to_follow_uname = req.body.user_to_follow_uname;
  var user_to_follow_pword = req.body.user_to_follow_pword;
  var user_to_follow;
  if(current_uname === user_to_follow_uname){
    res.redirect('/timeline');
  }
  else{
    db_users.getUser(current_uname, current_pword, function (error, user){
      if (error){
        res.redirect('/login');
      } else {
        current_user = user;
        db_users.getUser(user_to_follow_uname, user_to_follow_pword, function (error, user){
          if (error){
            res.redirect('/login');
          } else {
            user_to_follow = user;
            db_users.addUserFollowing(current_user, user_to_follow, function (error, users){
              res.redirect('/login/main');
            });  
          }
        });
      }
    });
  }
  
  
};