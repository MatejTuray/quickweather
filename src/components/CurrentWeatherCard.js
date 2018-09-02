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


const CurrentWeatherCard = (props) => {

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

        <div className="col-lg-4 offset-lg-4">

            <div className="card">

                <div className="card-header">
                    {moment(props.time * 1000).format("HH:MM")}
                </div>
                <img className="card-img-top" src={imgSrc()} alt="Card image cap" />
                <div className="card-body">
                    <h4 className="card-title">{props.summary}.</h4>

                    <br />

                    <p className="card-text">
                        <i id="tempHigh" className="fas fa-thermometer-three-quarters"></i><span className="card-text-content-temp">{Math.round(props.temp) + "°C"}</span><br />
                        <i className="wi wi-umbrella"></i><span className="card-text-content-precip">{Math.round(props.probRain * 100)} % pravdep. zrážok </span><br />
                        <i id="tempLow" className="wi wi-raindrop"></i><span className="card-text-content-precip"> {((props.intRain) * 10).toFixed(1)} mm </span><br />
                        <i className="wi wi-strong-wind"></i> <span className="card-text-content">{props.windSpeed} km/h</span><br />
                    </p>
                </div>
            </div>

        </div>

    )

}

export default CurrentWeatherCard;

