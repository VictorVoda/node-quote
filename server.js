//Creating an http server
const fs = require("fs");

require('http').createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    const data = fs.readFileSync("./website/index.html");
    response.end(data);
}).listen(process.env.PORT || 3000);