// ## Fake User 
// This will represent the information for "spongebobInfo" in the profile_page.ejs
var spongebob = {
	name: "Spongebob Squarepants",
	tweetCount : "50",
	followerCount: "100",
	followingCount: "120"
};

// ## Fake Set of Tweets
// This will represent the spongebobTweets on the profile page of spongebob
var spongebobTweets = [ 
{uname:"Spongebob", tweet:"WHERES PATRICK?!?!?!?!?"}, 
{uname:"Spongebob", tweet:"Squidward"}, 
{uname:"Spongebob", tweet:"I love the krusty krab!!!!!"},
{uname:"Spongebob", tweet:"Brushing my teeth is so easy since I only have 2 tooths"}];

// ### *function*: getSpongebobInfo
/**
 * Returns the spongebob's user info
 *
 * - `name` spongebob
 * - `tweetCount` The number of tweets spongebob has ever sent
 * - `followerCount` The number of followers spongebob has
 * - `followingCount` The number of people that are following spongebob
 *
 */
function getSpongebobInfo(){
	return spongebob;
}

exports.getSpongebobInfo = getSpongebobInfo;

// ### *function*: getSpongebobTweets
/**
 * Returns the array of tweets from spongebob.
 * Each object in the array has the following properties.
 *
 * - `uname` spongebob
 * - `tweet` The actual text of the tweet
 *
 */
function getSpongebobTweets(){
	return spongebobTweets;
}

exports.getSpongebobTweets = getSpongebobTweets;
