var spongebob = require('../lib/spongebob');

exports.profile_page = function(req,res){
  var spongebobInfo = spongebob.getSpongebobInfo();
	var spongebobTweets = spongebob.getSpongebobTweets();
	res.render('profile_page', {title: 'profile_page',spongebobInfo: spongebobInfo, spongebobTweets: spongebobTweets});
};
