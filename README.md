                                    Computer Science 326:  Team Wildcat 
                                        

              How to Run
You can run our app using `node app.js`
 
Project Assignment 03 Additions

- app.js: New Routes: New additions for registering such as connecting you to the register page and adding a user. 

- user.js: Function checkCredentials: Check to see if the username and password match and exist.
           Function addUser: adds user to a list of users who have been registed on the site.


- register.js: Function flash: checks to see if the user is already a registered user with us by checking their cookies. 
               Function checkCredentials: checks to see if all the fields have been filled.
               Function add: adds a new user by taking the information from the register form and sending it to user.js.

- profile_page.js: Function genTweets: creats a tweet with the info from the profile page form.
                  
- profile_page.ejs: New form added to allow the posting of tweets. 

Project Assignment 04 Additions

- added socket.io in node_modules
- added routing for any additions

- Ajax - 

	- profile_page.js: Function postPair: creates an XMLHTTPRequest (depending on the format, xml or json) and POSTs
	- javascripts/someFile.js - function: attemptTweet: takes the username and tweet and creates an XMLHttpRequest and tries to POST that data to our local /login/

- Websockets -

	- javascripts/timeline_update.js: function updateTimeline: adds received tweets to the timeline (formatted for the table)


Project Assignment 05 Additions

- added /data/ folder containing our .sql file that creates the database
- database contains 3 tables: Users, Tweets, Follows
	- Users: first name, last name, username, password, picture (the location of the image)
	- Tweets: tweet id number (automatically increments), email, the tweet text (max 160 characters), and the email that is linked to the user
	- Follows: # of followers, # of followees, and keys that reference to the users table
- change functions to use our database rather than our previous variables