

// function loadjsfile(filename, filetype){
//  if (filetype=="js"){ //if filename is a external JavaScript file
//   var fileref=document.createElement('script');
//   fileref.setAttribute("type","text/javascript");
//   fileref.setAttribute("src", filename);
//  }
// }

// loadjsfile("client.js", "js");
// loadjsfile("profile_page.js", "js");

function attemptTweet(){
	var name = $('input[name="name"]').val();
	var text = $('textarea[name="tweet"]').val();
	var uname = $('input[name="uname"]').val();
	var image_loc = $('input[name="image_loc"]').val();
	var request = new XMLHttpRequest();
	request.onreadystatechange = tweetCallback(request);
	request.open("POST", "/login/tweet?uname="+uname+"&name="+name+"&tweet="+text+"&image_loc="+image_loc, true);
	request.send();

	$.ajax({
			type : 'POST',
			url  : '/login/tweet',
			data : { name : name, uname : uname, tweet : text, image_loc : image_loc },
			dataType : 'json'
		}).done(tweetCallback);
}

function tweetCallback(response) {
	if (response.tweets !== undefined && response.uname !== undefined){
		var t = response.tweets[response.tweets.length-1];
		var tweetCount = response.tweetCount;
		$('#tweet_list').prepend(
			"<li>" + 
			"<img src=" + t.image_loc + " height='40' width='40' />" + " <strong>" + t.name + "</strong> <em>@" + t.uname + "</em>" + t.tweet +
			"</li>");
		$('textarea[name="tweet"]').val("");
		$('#tweetCount').html('<li id="tweetCount"><a href="/profile_page">' + tweetCount +' Tweets</a></li>');
		// TODO broadcast the tweet stuff
		console.log("attempting to emit the tweet");
		var socket = io.connect();
		console.log("connected to socket");
		socket.emit('tweet', {tweet: t, user : response.uname});
	}
}

function addOneFollower(){
	var uname = $('input[name="uname"]').val();
	var password = $('input[name="pword"]').val();
	var request = new XMLHttpRequest();
	request.onreadystatechange = addFollowerCallback(request);
	request.open("POST", "/profile_page?uname="+uname+"&password="+password, true);
	request.send();

	$.ajax({
		type : 'POST',
		url  : '/profile_page/addFollower',
		data : {uname : uname, password : password},
		dataType : 'json'
	}).done(addFollowerCallback);
}

function addFollowerCallback(response){
	var followerCount = response.followerCount;
	$('#followers').html('<li id="followers"><a href="/followers">' + followerCount +' Followers</a></li>');
}