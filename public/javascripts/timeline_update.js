function publisher() {
	var subscribers = {};
	var obj = {};

	obj.subscribe = function (type, fn) {
		if (subscribers[type] === undefined) {
			subscribers[type] = [];
		}
		subscribers[type].push(fn);
	};

	obj.unsubscribe = function (type, fn) {
    if (subscribers[type] === undefined) {
      return false;
    }
    var s = subscribers[type];
    var i;
    for (i = 0; i < s.length; i++) {
      if (s[i] === fn) {
        delete s[i];
        return true;
      }
    }

    return false;
  };

  obj.publish = function (type, arg) {
    if (subscribers[type] === undefined) {
      return false;
    }

    // Iterates over subscriber functions and invokes them:
    var s = subscribers[type];
    var i;
    for (i = 0; i < s.length; i++) {
      var fn = s[i];
      fn(arg);
    }
    return true;
  };

  return obj;
}

// The timeline list that corresponds with the timeline list defined in
// the view:
function timelineList() {
  var obj = Object.create(publisher());
  obj.elm = $('#timeline-list');

  // A method to add a message to the list:
  obj.addTweet = function (msg) {
    var next = $('<li>');
    next.text(msg);
    obj.elm.prepend(next);
  };

  return obj;
}

// The timeline application that creates all the necessary graphical
// widgets and connects them together in the correct way.
function timelineApp(socket) {
  var obj = Object.create(publisher());
  obj.elm = $('div#tweets');

  // Create each of the important UI objects:
  obj.list = timelineList();

  // Handle incoming post messages from the server:
  socket.on('post', function (data) {
    obj.list.addMessage(data.post);
  });

  return obj;
}

// This is the chat module to avoid name conflicts:
var Timeline = {};

$(function () {
  // Connect with WebSockets:
  var socket = io.connect();
  // Instantiate a new chat application:
  Timeline.app = timelineApp(socket);
});

