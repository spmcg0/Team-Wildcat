

function loadjsfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }

 loadjsfile("client.js", "js")
 loadjsfile("profile_page.js", "js")
 