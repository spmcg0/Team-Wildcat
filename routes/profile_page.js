var users = require('../lib/users');

exports.profile_page = function(req, res){
  	var user = users.getUsers();
  	var tweets = users.getTweets();
	res.render('profile_page_mock', { tweets: tweets, user: user});
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

var postPair = function (idx, format, callback)
{
    var req = new HttpRequest();
 
        if(format === 'xml'){
         req.open('Post', '/get-pairs/xml');
        }
    else{
         req.open('Post', 'get-pairs/json');
        }
 
 
    req.onreadystatechange = function () {
    //1-5 4  means itsDONE
      if (req.readyState === 4 && callback) {
        if (format === 'xml') {
          callback(req.responseXML);
        }
        else {
          callback(JSON.parse(req.responseText));
        }
      }
    };
};