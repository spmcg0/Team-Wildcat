create table Users (
	email varchar(255) primary key,
	first_name varchar(255),
	last_name varchar(255),
	uname varchar(16),
	pword varchar(16),
	image_loc varchar(255)
);

create table Tweets (
	tid integer primary key autoincrement,
	email varchar(255),
	tweet varchar (160),
	foreign key (email) references Users(email)
);

create table Follows (
	follower varchar(255),
	followee varchar(255),
	primary key (follower, followee),
	foreign key (follower) references Users(email),
	foreign key (followee) references Users(email)
);