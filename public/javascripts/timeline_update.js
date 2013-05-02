function updateTimeline(t){
  console.log("recieved: " + t);
  $('#timeline-list').prepend(
      "<li>" + 
      "<img src=" + t.image_loc + " height='40' width='40' />" + " <strong>" + t.name + "</strong> <em>@" + t.uname + "</em>" + t.tweet +
      "</li>");
}

$(function (){
  console.log("Connecting with the socket");
  var socket = io.connect();
  var uname = $('input[name="uname"]').val();
  socket.on(uname, updateTimeline);
})
