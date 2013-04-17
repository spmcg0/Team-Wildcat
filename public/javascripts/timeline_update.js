function updateTimeline(t){
  $('#tweets ul').prepend(
      "<li style='border-width: 1px; border-color: black; border-style: solid; width: 50%;'>" + 
      "<img src=" + t.image_loc + " height='40' width='40' />" + t.name + ": " + t.tweet +
      "</li>");
}

$(function (){
  console.log("Connecting with the socket");
  var socket = io.connect();
  var uname = $('input[name="uname"]').val();
  socket.on(uname, updateTimeline);
})
