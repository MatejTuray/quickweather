const express = require("express")
const path = require("path")
const app = new express()
const http = require('http');
const server = http.createServer(app)
const publicPath = path.join(__dirname, "..", "build/")
require("dotenv").load()
const port = process.env.PORT || 8080;
const axios = require("axios");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath))
require("./api/routes")(app)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(publicPath, "index.html"))
})
server.listen(port, () => { console.log("server is up") })




