var user = {
	name: "Spongebob Squarepants",
	tweetCount: "50",
	followerCount: "100",
	followingCount: "120"
};

var discoverTweets = [
{
	uname: "Patrick",
	tweet: "Have you guys seen #TheWalkingDead finale yet?"
},
{
	uname: "Squidward",
	tweet: "#GossipGirl was great tonight"
},
{
	uname: "Mr. Krabs",
	tweet: "More money more problems #RIPBiggie"
}

];


function getUser(){
	return user;
}

exports.getUser = getUser;

function getDiscoverTweets(){
	return discoverTweets;
}

exports.getDiscoverTweets = getDiscoverTweets;