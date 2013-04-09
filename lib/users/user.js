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
	var tweetLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < tweetLen; j++){
		var userTweets = tweetdb[j];
		if (userTweets.uname === user.uname) {
			returned = true;
			callback(undefined, userTweets.followers);
		}
	}
	if (!returned) callback("No followers Found");
}

exports.getUserFollowers = getUserFollowers;

function getUserFollowings(user, callback){
	var tweetLen = tweetdb.length;
	var returned = false;
	for (var j = 0; j < tweetLen; j++){
		var userTweets = tweetdb[j];
		if (userTweets.uname === user.uname) {
			returned = true;
			callback(undefined, userTweets.followings);
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
		console.log("error");
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

// ## Fake User Object
// This will represent the information for the "user" in the timeline.ejs
var user = {
	name: "Spongebob Squarepants",
	image_loc: "http://summitvoice.files.wordpress.com/2010/01/spongebob-standup.jpg",
	tweetCount: "50",
	followerCount: "100",
	followingCount: "120"
};

var users = [];

// ## Fake Set of Tweets
// This will represent the tweets on the home page from the people that the user
// who is logged in is following.
var tweets = [ 
	{uname:"Patrick", image_loc: "http://images3.wikia.nocookie.net/__cb20100724183920/spongebob/images/3/33/Patrick_Star.svg", tweet:"I miss mah sponge homie"}, 
	{uname:"Squidward", image_loc:"http://images1.wikia.nocookie.net/__cb20120726213002/spongefan/images/b/bc/Squidward.gif", tweet:"I hate Spongebob"}, 
	{uname:"Mr. Krabs", image_loc:"http://images2.fanpop.com/images/photos/4800000/Mr-Krabs-spongebob-squarepants-4870659-321-288.gif", tweet:"Spongebob is my best employee"} ];

// ### *function*: getUsers
/**
 * Returns the currently logged in `user` with
 * the following properties:
 *
 * - `name` The user's name
 * - `image_loc` The location of the user's profile image
 * - `tweetCount` The number of tweets the user has ever sent
 * - `followerCount` The number of followers the user has
 * - `followingCount` The number of people that are following the user
 *
 */
function getUsers(){
	return user;
}

exports.getUsers = getUsers;


// ### *function*: getTweets
/**
 * Returns the array of tweets from the people that this user is following.
 * Each object in the array has the following properties.
 *
 * - `uname` The user name of the person who sent the tweet
 * - `image_loc` The location of the profile pic from the user who sent the tweet
 * - `tweet` The actual text of the tweet
 *
 */
function getTweets(){
	return tweets;
}

exports.getTweets = getTweets;

// ### *function*: checkUser
/**
 * Returns a true or false if this users exists or not. 
 *
 * - `username` The user's name of the person 
 * - `password` the user's password
 *
 */


