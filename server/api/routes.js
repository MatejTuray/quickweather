const path = require("path")
const pathTo = path.join(__dirname, '/.env')
const dotenv = require("dotenv").config({ path: pathTo })
const express = require("express");
const app = express();
const axios = require("axios");
dotenv.parsed
const apiKey = process.env.APP_KEY
module.exports = (app) => {
    let lat, lng
    // POST ROUTE
    app.post("/api/weather-forecast-location", (req, res) => {
        lat = req.body.lat;
        lng = req.body.lng;
        console.log(lat), console.log(lng)
    });
    // GET ROUTES
    app.get("/api/weather-forecast-week", (req, res) => {
        console.log(apiKey)
        console.log(`Fetching weekly data for lat: ${lat} long: ${lng}`)
        axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=ca&lang=sk`).then((response) => res.send(response.data.daily.data))
    })
    app.get("/api/weather-current", (req, res) => {

        console.log(`Fetching current data for lat: ${lat} long: ${lng}`)
        axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=ca&lang=sk`).then((response) => res.send(response.data.currently))
    })
    app.get("/api/weather-hourly", (req, res) => {

        console.log(`Fetching hourly data for lat: ${lat} long: ${lng}`)
        axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=ca&lang=sk`).then((response) => res.send(response.data.hourly.data))
    })
}