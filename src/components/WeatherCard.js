import React from 'react'
import moment from "moment";
import PartlyCloudy from "../animated/cloudy-day-3.svg"
import Cloudy from "../animated/cloudy.svg"
import Rainy from "../animated/rainy-5.svg"
import ClearDay from "../animated/day.svg"
import Snowy from "../animated/snowy-5.svg"
import Wind from "../animated/wind.svg"


const WeatherCard = (props) => {

    let imgSrc = () => {
        if (props.icon === "clear-day" || props.icon === "partly-cloudy-night") {

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


    }
    return (

        <div className="col-lg-4">

            <div className="card">

                <div className="card-header">
                    {moment(props.time * 1000).format("DD/MM/YYYY")}
                </div>
                <img className="card-img-top" src={imgSrc()} alt="Card image cap" />
                <div className="card-body">
                    <h4 className="card-title">{props.summary}</h4>

                    <p className="card-text"><i id="tempLow" className="fas fa-thermometer-empty"></i><span className="card-text-content-temp">{Math.round(props.tempLow) + "°C"}</span>
                        <br />
                        <i id="tempHigh" className="fas fa-thermometer-three-quarters"></i><span className="card-text-content-temp">{Math.round(props.tempHigh) + "°C"}</span><br />
                        <i className="wi wi-umbrella"></i><span className="card-text-content-precip">{Math.round(props.probRain * 100)} % pravdep. zrážok </span><br />
                        <i id="rainDrop" className="wi wi-raindrop"></i><span className="card-text-content-precip"> {((props.intRain) * 10).toFixed(1)} mm </span><br />
                        <i className="wi wi-strong-wind"></i> <span className="card-text-content">{props.windSpeed} km/h</span><br />
                        <i className="wi wi-sunrise"></i>  <span className="card-text-content">{moment(props.sunrise * 1000).format("HH:MM")}</span><br />
                        <i className="wi wi-sunset"></i>  <span className="card-text-content">{moment(props.sunset * 1000).format("HH:MM")}</span>
                    </p>
                </div>
            </div>



        </div>
    )
}





export default WeatherCard
