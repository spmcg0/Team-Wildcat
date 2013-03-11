var user = {
	name: "Spongebob Squarepants",
	image_loc: "http://summitvoice.files.wordpress.com/2010/01/spongebob-standup.jpg",
	tweetCount: "50",
	followerCount: "100",
	followingCount: "120"
};

var tweets = [ 
	{uname:"Patrick", image_loc: "http://images3.wikia.nocookie.net/__cb20100724183920/spongebob/images/3/33/Patrick_Star.svg", tweet:"I miss mah sponge homie"}, 
	{uname:"Squidward", image_loc:"http://images1.wikia.nocookie.net/__cb20120726213002/spongefan/images/b/bc/Squidward.gif", tweet:"I hate Spongebob"}, 
	{uname:"Mr. Krabs", image_loc:"http://images2.fanpop.com/images/photos/4800000/Mr-Krabs-spongebob-squarepants-4870659-321-288.gif", tweet:"Spongebob is my best employee"} ];

function getUsers(){
	return user;
}

exports.getUsers = getUsers;

function getTweets(){
	return tweets;
}

exports.getTweets = getTweets;