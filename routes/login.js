var user = require('../lib/users');
var authResp;
var userids = 0;
var online = {};

function flash (req, res, name, value) {
	if (value !== undefined) {
		res.cookie(name, value);
		return value;
	} 
	else {
		value = req.cookies[name];
		res.clearCookie(name);
		return value;
	}
}

exports.login = function(req, res){
	var message = flash(req, res, 'auth') || '';
	var userid = req.cookies.userid;

	if (userid !== undefined && online[userid] !== undefined) {
		res.redirect('/login/main');
	}
	else {
		res.render('login', {	title: 'login', 
 								message: message});
	}
};

exports.logout = function (req, res) {
	var userid = req.cookies.userid;
	if (online[userid] !== undefined) {
		res.clearCookie('userid');
    	delete online[userid];
  	}
  	res.redirect('/login');
};

exports.auth = function(req, res){
	var userid = req.cookies.userid;
	if (userid !== undefined && online[userid] !== undefined) {
		res.redirect('/login/main');
	}
	else {
		var uname = req.body.uname;
		var pword = req.body.pword;
		user.getUser(uname, pword, function (error, u){
			if (error){
				flash(req, res, 'auth', error);
				res.redirect('/login');
			} else {
				userid = ++userids;
				res.cookie('userid', userid+'', { maxAge : 900000});
				online[userid] = u;
				res.redirect('/login/main');
			}
		});
	}
};

exports.main = function (req, res) {
	var userid = req.cookies.userid;
	if (userid === undefined || online[userid] === undefined){
		flash(req, res, 'auth', 'Not logged in!');
		res.redirect('/login');
	}
	else {
		var u = online[userid];
		user.getUserTweets (u, function(error, tweets){
			if(error){
				console.log("error");
			}else{
				online[userid]['tweets'] = tweets;	
			}
		});
		user.getUserTimeline(u, function(error, timeline){
			if(error){
				console.log("error in getting timeline");
			}
			else{
				online[userid]['timeline'] = timeline;
			}
		})
		user.getUserFollowers (u, function(error, followers){
			if(error){
				console.log("error");
			}
			else{
				online[userid]['followers'] = followers;	
			}
		});
		user.getUserFollowings (u, function(error, followings){
			if(error){
				console.log("error");
			}
			else{
				online[userid]['followings'] = followings;	
			}
		});
		res.redirect('/login/timeline');

	}
};

exports.timeline = function (req, res) {
	var userid = req.cookies.userid;
	var u = online[userid];
	var t = u.timeline;
	res.render('timeline', { timeline : t, user : u });
};

exports.profile_page = function (req, res) {
  var userid = req.cookies.userid;
  var u = online[userid];
  var t = u.tweets;
  res.render('profile_page', { tweets : t, user : u });
};

exports.followers = function (req, res) {
  var userid = req.cookies.userid;
  var u = online[userid];
  var f = u.followers;
  res.render('followers', { followers : f, user : u });
};

exports.following = function (req, res) {
  var userid = req.cookies.userid;
  var u = online[userid];
  var f = u.followings;
  res.render('following', { following : f, user : u });
};

exports.tweet = function (req, res) {
  var userid = req.cookies.userid;
  var u = online[userid];
  var tweet = tweetData(req);
  if(user.validateUserTweet(tweet)) {
  	user.addUserTweet(tweet, function(error, tweets){
  		online[userid]['tweets'] = tweets;
  	});
  	u.tweetCount++;
  	var t = u.tweets;
  	res.render('profile_page', { tweets : t, user : u });
  }
  else{
    console.log('failed');
  }
};

function tweetData(req) {
  var tweet;
  if(req.method == 'GET') {
  	tweet = {
      uname: req.query.uname,
      tweets: {
      	name: req.query.uname,
      	image_loc: req.query.image_loc,
      	tweet: req.query.tweet,
      }
    };
  }
  else {
    tweet = {
      uname: req.body.uname,
      tweets: {
      	name: req.body.uname,
      	image_loc: req.body.image_loc,
      	tweet: req.body.tweet,
      }
    };
  }
  return tweet;
}



