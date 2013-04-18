/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , timeline = require('./routes/timeline')
  , profile_page = require('./routes/profile_page')
  , discover = require('./routes/discover')
  , login = require('./routes/login')
  , search = require('./routes/search')
  , http = require('http')
  , path = require('path')
  , register = require('./routes/register');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookies monster'));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Routes
app.get('/', routes.index);
app.get('/timeline', timeline.timeline);
app.get('/profile_page', profile_page.profile_page);
app.get('/discover', discover.discover);
app.get('/login', login.login);
app.post('/login/auth', login.auth);
app.get('/login/main', login.main);
app.get('/login/profile_page', login.profile_page);
app.get('/login/timeline', login.timeline);
app.get('/login/followers', login.followers);
app.get('/login/following', login.following);
app.get('/register', register.register);
app.post('/register/submit', register.submit);
app.get('/register/add', register.add);
app.get('/logout', login.logout);
app.get('/search', search.search);
app.post('/follow', search.follow);
app.post('/login/tweet', login.postTweet);

var server = http.createServer(app);

// WebSockets/Socket.IO
var io = require('socket.io', {'log level': 0}).listen(server);

io.sockets.on('connection', function (socket) {
  login.initSocket(socket);
});

server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode",
              server.address().port, app.settings.env);
});

