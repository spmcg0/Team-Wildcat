
/*
 * GET home page.
 */

var users = require('../lib/users');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.timeline = function(req, res){
  	var user = users.getUsers();
	var tweets = users.getTweets();
		
  	res.render('timeline', { tweets: tweets, user: user});
};

exports.discover = function(req, res){
	res.render('discover', {title: 'Discover'})
}