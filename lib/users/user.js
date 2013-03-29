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

// ### *function*: addUser
/**
 * Creates a new account for the app
 *
 * - `userInfo` Data from the signUp screen to create an account. Password and Usersname.
 *
 */

function addUser(userInfo) {
    users.push(userInfo);

}

exports.addUser = addUser;

// ### *function*: checkUser
/**
 * Returns a true or false if this users exists or not. 
 *
 * - `username` The user's name of the person 
 * - `password` the user's password
 *
 */

function checkUser(user) {
    return user.username && user.password;
}

exports.checkUser = checkUser;

