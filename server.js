let http = require('http');

function onRequest(request, response) {
  response.writeHead(200, {'contentType' : 'textPlain'});
  console.log("listening...")
  response.write("hello you are on the server");
  response.end();
}

http.createServer(onRequest).listen(3000);