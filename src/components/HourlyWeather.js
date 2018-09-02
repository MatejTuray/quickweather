import React from 'react'
import moment from "moment";
import PartlyCloudy from "../animated/cloudy-day-3.svg"
import Cloudy from "../animated/cloudy.svg"
import Rainy from "../animated/rainy-5.svg"
import ClearDay from "../animated/day.svg"
import Snowy from "../animated/snowy-5.svg"
import Wind from "../animated/wind.svg"
import CloudyNight from "../animated/cloudy-night-3.svg"
import ClearNight from "../animated/night.svg"
const HourlyWeather = (props) => {

    let imgSrc = () => {
        if (props.icon === "clear-day") {

            return ClearDay
        } else if (props.icon === "partly-cloudy-day") {

            return PartlyCloudy
        } else if (props.icon === "rain") {
            return Rainy
        } else if (props.icon === "cloudy") {
            return Cloudy
        } else if (props.icon === "snow") {
            return Snowy
        } else if (props.icon === "wind") {
            return Wind
        }
        else if (props.icon === "partly-cloudy-night" || props.icon === "cloudy-night") {
            return CloudyNight
        }
        else if (props.icon === "clear-night") {
            return ClearNight
        }

    }

    return (



        <div className="list-group-item list-group-item-action flex-column align-items-center">


            <div>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{moment(props.time * 1000).format("DD/MM HH:00")}</h5>
                    <img className="list-img" src={imgSrc()} />
                </div>
                <h6 className="list-title">{props.summary}.</h6> <br />
                <p className="mb-1">

                    <i id="temp" className="fas fa-thermometer-three-quarters"></i><span className="list-text-content-temp-single">{Math.round(props.temp) + "°C"}</span><br />
                    <i className="wi wi-raindrop"></i><span className="list-text-content-precip"> {((props.intRain) * 10).toFixed(1)} mm </span><br />
                    <i className="wi wi-strong-wind"></i> <span className="list-text-content">{props.windSpeed} km/h</span><br />
                </p>
            </div>


        </div>


    )
}

export default HourlyWeather