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

