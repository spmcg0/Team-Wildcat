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
			online[userid]['tweets'] = tweets;
			res.redirect('/login/timeline');
		});

	}
};

exports.timeline = function (req, res) {
	var userid = req.cookies.userid;
	var u = online[userid];
	var t = u.tweets;
	res.render('timeline', { tweets : t, user : u });
}