var user = require('../lib/users');
var message = '';

exports.register = function (req, res) {
	res.render('register', { message : message });
}

exports.submit = function (req, res) {
	var first = req.body.first;
	var last = req.body.last;
	var email = req.body.email;
	var uname = req.body.uname;
	var pword = req.body.pword;
	var confirmPword = req.body.confirmPword;
	if (first === '' || last === '' || email === '' || uname === '' || pword === ''){
		message = "Please fill in all the fields";
		res.redirect('/register');
	}
	if (pword !== confirmPword){
		message = "Passwords do not match";
		res.redirect ('/register');
	}
	var check = user.checkCredentials (uname, email);
	if (check){
		message = check;
		res.redirect('/register');
	} 
	console.log("WTF");
	user.addUser(first, last, email, uname, pword, function (){
		res.redirect('/login');
	});
}