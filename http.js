//Creating an http server
const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;

const server = http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile("index.html", function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write("Error: File not found");
        }
        else {
            response.write(data);
        }
        response.end();
    });
});

server.listen(port, function (error) {
    if (error) {
        console.log("Something went wrong", error);
    }
    else {
        console.log("Server working port: " + port);
    }
})
