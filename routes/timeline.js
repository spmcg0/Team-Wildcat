var users = require('../lib/users');

exports.timeline = function(req, res){
  	var user = users.getUsers();
  	var tweets = users.getTweets();
	res.render('timeline', { tweets: tweets, user: user});
};