
var discover = require('../lib/discover')


exports.discover = function(req, res){
	var user = discover.getUser();
	var tweets = discover.getDiscoverTweets();
	res.render('discover', {title: 'Discover', tweets: tweets, user: user });
};