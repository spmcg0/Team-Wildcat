var user = require('../lib/users');
var db_users = require('../lib/db_users');
var message = '';

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

exports.register = function (req, res) {
	res.render('register', { message : message });
};

exports.submit = function (req, res) {
	var first = req.body.first;
	var last = req.body.last;
	var email = req.body.email;
	var uname = req.body.uname;
	var pword = req.body.pword;
	var confirmPword = req.body.confirmPword;
	
	user.checkCredentials (first, last, uname, email, pword, confirmPword, function(error, u) {
		if (error){
			message = error;
			res.redirect('/register');
		}
		else {
			flash (req, res, 'user', u);
			res.redirect('/register/add');
		}
	});
};

exports.add = function (req, res) {
	var u = flash (req, res, 'user');
	var first = u.first;
	var last = u.last;
	var email = u.email;
	var uname = u.uname;
	var pword = u.pword;
	console.log(first + " " + last + " " + email + " " + uname + " " + pword);
	db_users.addUser(first, last, email, uname, pword, function (error){
		if (error){
			message = error;
			res.redirect('/register');
		} else {
			res.redirect('/login');
		}
	});
};