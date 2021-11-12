//Creating an http server

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile("C:\\Victor\\SOFTWARE_ENGINEERING\\NodeJS\\node-quote\\files\\index.html"));
app.listen(port);

app.use(express.static("./files"));
