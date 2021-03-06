var user = require('../lib/users');
var db_users = require('../lib/db_users');
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
		db_users.getUser(uname, pword, function (error, u){
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
		db_users.getUserTweets (u, function(error, tweets){
			if(error){
				console.log("error");
			}else{
				online[userid]['tweets'] = tweets;	
			}
		});
		db_users.getUserTimeline(u, function(error, timeline){
			if(error){
				console.log("error in getting timeline");
			}
			else{
				online[userid]['timeline'] = timeline;
			}
		})
		db_users.getUserFollowers (u, function(error, followers){
			if(error){
				console.log("error");
			}
			else{
				online[userid]['followers'] = followers;	
			}
		});
		db_users.getUserFollowings (u, function(error, followings){
			if(error){
				console.log("error");
			}
			else{
				online[userid]['followings'] = followings;	
			}
		});
		res.redirect('/timeline');

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
  db_users.getUserFollowers(online[userid], function(err, f){
  	res.render('followers', { followers : f, user : u });
  });
};

exports.following = function (req, res) {
  var userid = req.cookies.userid;
  var u = online[userid];
  db_users.getUserFollowings(online[userid], function(err, f){
  	res.render('following', { following : f, user : u });
  });
};

function tweetData(req) {
  var tweet;
  if(req.method == 'GET') {
  	tweet = {
      uname: req.query.uname,
      tweets: {
      	name : req.query.name,
      	uname: req.query.uname,
      	image_loc: req.query.image_loc,
      	tweet: req.query.tweet,
      }
    };
  }
  else {
    tweet = {
      uname: req.body.uname,
      tweets: {
      	name: req.body.name,
      	uname: req.body.uname,
      	image_loc: req.body.image_loc,
      	tweet: req.body.tweet,
      }
    };
  }
  return tweet;
}

exports.postTweet = function (req, res) {
	console.log ("beginning to post");
	var userid = req.cookies.userid;
	var u = online[userid];
	var tweet = tweetData(req);
	console.log(tweet);
	console.log(u);
	if(user.validateUserTweet(tweet)) {
		db_users.addUserTweet(tweet, u, function(error, tweets){
		  	u.tweetCount++;
			var t = u.tweets;
			t.push(tweets);
			var resp = { tweets : t, uname : u.uname, tweetCount : u.tweetCount };
			console.log(resp);
			res.json(resp);
		});
	// u.tweetCount++;
	// var t = u.tweets;
	// var resp = { tweets : t, uname : u.uname, tweetCount : u.tweetCount };
	// console.log(resp);
	// 	res.json(resp);
	}
	else{
		console.log('failed');
	}
};

exports.addOneFollower = function(req, res){
	// var uname = req.body.uname;
 //  	var pword = req.body.password;
 //  	console.log(uname + " " + pword);
 //  	var u;
 //  	db_users.getUser(uname, pword, function (error, user){
 //       	user.followerCount++;
 //       	u = user;
 //    });
	db_users.increaseFollowerCount(req.body.uname, function(error, followerCount){
		if (error === undefined){
			var resp = {followerCount: followerCount};
		    console.log(resp);
		    res.json(resp);
		} else {
			res.json({ error: error });
		}
	});
}

exports.initSocket = function(socket) {
	socket.on('tweet', function (data) {
		// console.log("Recieved post: " + JSON.stringify(data));
		console.log("Recieved socket info for " + data);
		db_users.getUserFollowers(data.user, function (error, followers){
			for (var k = 0; k < followers.length; k++){
				var follower = followers[k];
				console.log("Sending information to " + follower.uname);
				socket.broadcast.emit (follower.uname, data.tweet); // Broadcasts the new tweet to each of the user's followers by user name
			}
		});
	});
}
