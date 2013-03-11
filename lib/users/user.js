var user = {
	name: "Spongebob Squarepants",
	tweetCount: "50",
	followerCount: "100",
	followingCount: "120"
};

var tweets = [ 
{uname:"Patrick", tweet:"I miss mah sponge homie"}, 
{uname:"Squidward", tweet:"I hate Spongebob"}, 
{uname:"Mr. Krabs", tweet:"Spongebob is my best employee"}];

function getUsers(){
	return user;
}

exports.getUsers = getUsers;

function getTweets(){
	return tweets;
}

exports.getTweets = getTweets;