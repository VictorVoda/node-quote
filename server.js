//Creating an http server

const express = require("express");
const app = express();
const http = require('http');

app.listen = function() {
    http.createServer(this)
    http.listen(process.env.PORT || 3000);
}

app.use(express.static("website/index.html"));
