const express = require("express");
const path = require("path");
const app = new express();
const http = require('http');
const server = http.createServer(app);
const staticFiles = express.static(path.join(__dirname, '/build'))
require("dotenv").load();
const port = process.env.PORT || 8080;
const axios = require("axios");
console.log(staticFiles)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath));
require("./api/routes")(app);
app.use('/*', staticFiles)
server.listen(port, () => {
    console.log("server is up");
});