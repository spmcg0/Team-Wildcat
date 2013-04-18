var users = require('../lib/users');

exports.profile_page = function(req, res){
  	var user = users.getUsers();
  	var tweets = users.getTweets();
	res.render('profile_page_mock', { tweets: tweets, user: user});
};