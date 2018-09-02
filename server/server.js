const express = require("express")
const path = require("path")
const app = new express()
const publicPath = path.join(__dirname, "..", "build")
console.log(publicPath)
require("dotenv").load()
const port = process.env.PORT || 8080;
const axios = require("axios");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath))
require("./api/routes")(app)
app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"))
})
app.listen(port, () => { console.log("server is up") })




