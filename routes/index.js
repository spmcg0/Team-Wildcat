/*
 * GET home page.
 */

var users = require('../lib/users');
var discover = require('../lib/discover');
var spongebob = require('../lib/spongebob');


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.timeline = function(req, res){
  	var user = users.getUsers();
  	var tweets = users.getTweets();
	res.render('timeline', { tweets: tweets, user: user});
};

exports.discover = function(req, res){
	var user = discover.getUser();
	var tweets = discover.getDiscoverTweets();
	res.render('discover', {title: 'Discover', tweets: tweets, user: user });
};

exports.login = function(req,res) {
	res.render('login', {title: 'login'});
};

exports.profile_page = function(req,res){
  var spongebobInfo = spongebob.getSpongebobInfo();
	var spongebobTweets = spongebob.getSpongebobTweets();
	res.render('profile_page', {title: 'profile_page',spongebobInfo: spongebobInfo, spongebobTweets: spongebobTweets});
};

exports.signUp = function(req, res){
  res.render('signUp', { title: 'Express' });
};

exports.timeline = function(req, res){
  res.render('timeline', { title: 'Express' });
};