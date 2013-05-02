var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./data/twitter');

var defaultPicLoc = "/images/default.jpg";

function addUser(first, last, email, uname, pword, callback){
	console.log("about to add user");
	console.log("INSERT INTO Users (first_name, last_name, email, uname, pword) values ('" + first + "', '" + last + "', '" + email + "', '" + uname + "', '" + pword + "')");
	db.run("INSERT INTO Users (first_name, last_name, email, uname, pword, image_loc, fake_followers) values ('" + first + "', '" + last + "', '" + email + "', '" + uname + "', '" + pword + "', '" + defaultPicLoc +"', 0)", function(err){
		if (err){
			callback("An error occurred adding the User to the database");
		} else {
			callback();
		}
	});
	console.log("added user");
}

exports.addUser = addUser;

function getUser(uname, pword, callback){
	var returned = false;
	db.get("SELECT * FROM Users u WHERE u.uname='" + uname + "'", function (err, row){
		console.log(err + " \n" + row);
		if (row === undefined){
			callback("User not found with username " + uname);
		} else {
			row.first = row.first_name; // I could write the query to do this but using a * and doing this just seems way messier so I'm doing it this way
			row.last = row.last_name;
			row.imageLoc = row.image_loc;
			if (row['pword'] === pword){
				callback (undefined, row);
			} else {
				callback ("Invalid password");
			}
		}
	});
}

exports.getUser = getUser;

function getSearchResults(uname, callback){
	db.get("SELECT * FROM Users u WHERE u.uname='" + uname + "'", function(err, row){
		if (row === undefined){
			callback("No search results for " + uname);
		} else {
			var users = [];
			row.first = row.first_name;
			row.last = row.last_name;
			row.imageLoc = row.image_loc;
			users.push(row);
			callback (undefined, users);
		}
	});
}

exports.getSearchResults = getSearchResults;

function getUserTweets(user, callback, limit){
	var sql = "SELECT t.tweet as tweet, t.imageLoc as image_loc, t.uname as uname, t.first_name as name FROM Tweets t WHERE t.email='" + user.email + "' ORDER BY t.ttime";
	if (limit !== undefined)
		sql += " LIMIT " + limit;
	db.all(sql, function(err, row){
		if (row === undefined){
			callback("No Tweets Found");
		} else {
			console.log(row[0]);
			row.uname = user.uname;
			callback(undefined, row);
		}
	});
}

exports.getUserTweets = getUserTweets;

function getUserFollowers(user, callback){
	db.all("SELECT * from Users u, Follows f WHERE f.followee='" + user.email + "' AND u.email=f.follower", function(err, row){
		console.log(row);
		if (row===undefined){
			callback("No Followers");
		} else {
			row.uname = user.uname;
			callback(undefined, row);
		}
	});
}

exports.getUserFollowers = getUserFollowers;

function getUserFollowings(user, callback){
	db.all("SELECT * from Users u, Follows f WHERE f.follower='" + user.email + "' AND u.email=f.followee", function(err, row){
		console.log(row);
		if (row===undefined){
			callback("No Followings");
		} else {
			row.uname = user.uname;
			callback(undefined, row);
		}
	});
}

exports.getUserFollowings = getUserFollowings;

function getUserTimeline(user, callback){
	var sql = 	"select distinct t.tweet as tweet, t.imageLoc as image_loc, t.uname as uname, t.first_name as name " + // I'm a G fool recognize
				"from Tweets t, Follows f " +  
				"where t.email='bstaplet@student.umass.edu' or (f.follower='bstaplet@student.umass.edu' and t.email=f.followee) " + 
				"order by t.ttime " + 
				"limit 20";
	db.all(sql, function(err, rows){
		if (rows ===undefined){
			callback("Nothing found for the timeline");
		} else {
			callback(undefined, rows);
		}
	});
}

exports.getUserTimeline = getUserTimeline;

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