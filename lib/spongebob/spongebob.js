var spongebob = {
	name: :"Spongebob Squarepants",
	tweetCount : "50",
	followerCount: "100",
	followingCount: "120"
};

var spongebobTweets = [ 
{uname:"Spongebob", tweet:"WHERES PATRICK?!?!?!?!?"}, 
{uname:"Spongebob", tweet:"Squidward"}, 
{uname:"Spongebob", tweet:"I love the krusty krab!!!!!"}
{uname:"Spongebob", tweet:"Brushing my teeth is so easy since I only have 2 tooths"}];

function getSpongebob(){
	return spongebob;
}

exports.getSpongebob = getSpongebob;

function getSpongebobTweets(){
	return spongebobTweets;
}

exports.getSpongebobTweets = getSpongebobTweets;
