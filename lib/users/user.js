var userdb = [
	new User ("Spongebob", "Squarepants", "sponge@KrustyKrab.com", "datSponge", "gary", "http://summitvoice.files.wordpress.com/2010/01/spongebob-standup.jpg", 3, 0, 0)
];
var tweetdb = [
	{	uname : "datSponge",
		tweets : [
			{ 	name:"Patrick", 
				image_loc: "http://images3.wikia.nocookie.net/__cb20100724183920/spongebob/images/3/33/Patrick_Star.svg", 
				tweet:"I miss mah sponge homie @datSponge"},
			{
				name:"Squidward", 
				image_loc:"http://images1.wikia.nocookie.net/__cb20120726213002/spongefan/images/b/bc/Squidward.gif", 
				tweet:"I hate @datSponge"},
			{
				name:"Mr. Krabs", 
				image_loc:"http://images2.fanpop.com/images/photos/4800000/Mr-Krabs-spongebob-squarepants-4870659-321-288.gif", 
				tweet:"@datSponge is my best employee"}
		],
		followers : [
		],
		followings : [
		]
	}
];
var defaultPicLoc = "http://renaissancedayspadotnet.files.wordpress.com/2012/03/facebook-no-image11.gif";

function User (first, last, email, uname, pword, imageLoc, tweetCount, followerCount, followingCount){
	console.log ("insisde user constructor");
	this.first = first;
	this.last = last;
	this.email = email;
	this.uname = uname;
	this.pword = pword;
	this.imageLoc = imageLoc;
	this.tweetCount = tweetCount;
	this.followerCount = followerCount;
	this.followingCount = followingCount;
}

function addUser(first, last, email, uname, pword, callback){
	console.log("about to add user");
	userdb.push(new User(first, last, email, uname, pword, defaultPicLoc, 0, 0, 0));
	var user = {
      uname: uname,
      tweets: [],
      followers: [],
      followings: []
    };
    tweetdb.push(user);
	console.log("added user");
	callback();
}

exports.addUser = addUser;

function getUser(uname, pword, callback){
	var length = userdb.length;
	var returned = false;
	for (var i = 0; i < length; i++){
		if (userdb[i].uname === uname){
			if (userdb[i].pword === pword){
				returned = true;
				callback (undefined, userdb[i]);
			}
			else 
				callback ("Invalid password");
		}
	}
	if (!returned) callback("User not found with username " + uname);
}

exports.getUser = getUser;

function getSearchResults(uname, callback){
	var length = userdb.length;
	var users = [];
	var returned = false;
	for(var i =0; i < length; i++){
		if(userdb[i].uname === uname){
			returned = true;
			users.push(userdb[i]);
		}
	}
	if(!returned) callback("No search results for " + uname);
	callback (undefined, users);
}

exports.getSearchResults = getSearchResults;

function getUserTweets(user, callback){
	var tweetLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < tweetLen; j++){
		var userTweets = tweetdb[j];
		if (userTweets.uname === user.uname) {
			returned = true;
			callback(undefined, userTweets.tweets);
		}
	}
	if (!returned) callback("No Tweets Found");
}

exports.getUserTweets = getUserTweets;

function getUserFollowers(user, callback){
	var followersLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < followersLen; j++){
		var userFollowers = tweetdb[j];
		if (userFollowers.uname === user.uname) {
			returned = true;
			callback(undefined, userFollowers.followers);
		}
	}
	if (!returned) callback("No followers Found");
}

exports.getUserFollowers = getUserFollowers;

function getUserFollowings(user, callback){
	var followingsLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < followingsLen; j++){
		var userFollowings = tweetdb[j];
		if (userFollowings.uname === user.uname) {
			returned = true;
			callback(undefined, userFollowings.followings);
		}
	}
	if (!returned) callback("No followings Found");
}

exports.getUserFollowings = getUserFollowings;

function addUserTweet(tweetData, callback) {
	var tweetLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < tweetLen; j++){
		var userTweets = tweetdb[j];
		if (userTweets.uname === tweetData.uname) {
			returned = true;
			userTweets.tweets.push(tweetData.tweets);
			callback(undefined, userTweets.tweets);
		}
	}
	if(!returned){
		returned = true;
		var tempTweets = [];
		tempTweets.push(tweetData.tweets);
		tweetData.tweets = tempTweets;
		tweetdb.push(tweetData);
		callback(undefined, tweetData.tweets);
	}
}

exports.addUserTweet = addUserTweet;

function addUserFollowing(user, user_to_follow, callback) {
	var tweetLen = tweetdb.length;
	var following = false;
	var followed = false;
	for (var j = 0; j < tweetLen; j++){
		var userTweets = tweetdb[j];
		if (userTweets.uname === user.uname) {
			following = true;
			userTweets.followings.push(user_to_follow);
		}
		if(userTweets.uname === user_to_follow.uname){
			followed = true;
			userTweets.followers.push(user);
		}
	}
	if(!following && !followed){
		callback("error");
	}
	callback(undefined, userTweets.followings);
}

exports.addUserFollowing = addUserFollowing;

function validateUserTweet(tweetData) {
	return tweetData.uname && tweetData.tweets.name && tweetData.tweets.image_loc && tweetData.tweets.tweet;
}

exports.validateUserTweet = validateUserTweet

function checkCredentials (first, last, uname, email, pword, confirmPword, callback){
	var len = userdb.length;
	var returned = false;
	if (first === '' || last === '' || email === '' || uname === '' || pword === ''){
		returned = true;
		callback("Please fill in all the fields");
	}
	if (pword !== confirmPword){
		returned = true;
		callback("Passwords do not match");
	}
	for (var k = 0; k < len; k++){
		var u = userdb[k];
		if (u.uname === uname){
			returned = true;
			callback("Username is already being used");
		}
		if (u.email === email){
			returned = true;
			callback("That email is already registered");
		}
	}
	if (!returned) callback (undefined, { first : first, last : last, uname : uname, email : email, pword : pword });
}

exports.checkCredentials = checkCredentials;




var postPair = function (idx, format, callback) {
    
    var req = new XMLHttpRequest();
 
 
    if (format === 'xml') {
      req.open('POST', '/get-pairs/xml');
    }
    else {
      req.open('POST', '/get-pairs/json');
    }
 
    req.setRequestHeader('Content-Type', 'application/json');

    var msg = { index: idx };
 

    req.send(JSON.stringify(msg));
  }







