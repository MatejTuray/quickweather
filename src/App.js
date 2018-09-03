import React from 'react';
import WForm from "./components/WForm";
import WeatherCard from "./components/WeatherCard";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import HourlyWeather from "./components/HourlyWeather";
import Header from "./components/Header";
import axios from "axios";
import "./styles/styles.css"




class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            acceptedGeoLoc: false,
            lat: 0,
            lng: 0,
            address: "",
            isLoading: true,
            type: "",
            weather: [

            ],
            hasCompleted: true,



        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this)

    }
    componentDidMount() {

        let formSelector = document.querySelector("#options")
        let url
        let forecastType
        forecastType = formSelector.value

        if (forecastType === "daily") {
            url = "/api/weather-forecast-week"
            this.setState({
                type: forecastType,
            })
        }
        else if (forecastType === "currently") {
            url = "/api/weather-current"
            this.setState({
                type: forecastType,
            })
        }

        navigator
            .geolocation
            .getCurrentPosition((pos, error, ) => {
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                this.setState({ acceptedGeoLoc: true, lat: lat, lng: lng, address: "Počasie vo Vašej lokalite:" })
                axios.post("/api/weather-forecast-location", {
                    lat: this.state.lat,
                    lng: this.state.lng,
                    isLoading: true,
                })
                axios
                    .get(url)
                    .then((response) => this.setState({
                        weather: response.data,
                        isLoading: false,
                    }))
            })



    }


    handleSubmit(e) {

        e.preventDefault();
        let url
        let forecastType = e.target[1].value;
        if (forecastType === "daily") {
            url = "/api/weather-forecast-week"
            this.setState({
                type: forecastType,
            })
        }
        else if (forecastType === "currently") {
            url = "/api/weather-current"
            this.setState({
                type: forecastType,
            })
        }
        else if (forecastType === "hourly") {
            url = "/api/weather-hourly"
            this.setState({
                type: forecastType,
            })
        }

        let userInput = e.target[0].value

        if (userInput !== "") {
            this.setState({
                hasCompleted: false,
            })
            axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}`)
                .then((response) => {
                    if (response.data.status === "OK") {

                        let lat = response.data.results[0].geometry.location.lat
                        let lng = response.data.results[0].geometry.location.lng
                        let address = response.data.results[0].formatted_address
                        this.setState({ lat: lat, lng: lng, address: `Počasie v: ${address}` });
                        axios.post("/api/weather-forecast-location", {
                            lat: this.state.lat,
                            lng: this.state.lng,
                            isLoading: true,
                            weather: [],

                        }).catch((e) => { console.log(e) })
                        axios
                            .get(url)
                            .then((response) => {
                                this.setState({
                                    weather: []
                                }); this.setState((prevState) => ({
                                    weather: prevState.weather.concat(response.data),
                                }))
                            }).then(() => this.setState({
                                isLoading: false,
                                hasCompleted: true,
                            }))
                    }
                    else if (userInput === "") {
                        alert("Vložte prosím adresu")
                    }
                    else {
                        alert("Lokalita ktorú ste uviedli nebola platná, prosím opravte alebo bližšie špecifikujte lokalitu")
                    }
                }, () => alert("Vyskytol sa problém s komunikáciou so serverom"))
                .catch((e) => console.log("Error", e)); e
                    .target[0]
                    .value = "";
        }

    }
    handleChange(e) {
        this.setState({
            isLoading: false
        })
    }


    render() {


        return (
            <div>

                <div className="container">
                    <Header />

                    <WForm handleSubmit={this.handleSubmit} input={this.state.input} />

                    {this.state.acceptedGeoLoc
                        ? <h2 className="d-flex justify-content-center mt-5">{this.state.isLoading === true ? <div className="spinner-container"><div className="bt-spinner"></div></div> : this.state.address}</h2>
                        : <h3 className="d-flex justify-content-center mt-5">Použite vyhľadávací formulár pre aktuálne počasie vo svete
                        <br /> {this.state.address}

                        </h3>}
                    <div className="container">
                        <div> {this.state.hasCompleted === true ?
                            <div className="row align-items-center">
                                {(this.state.isLoading === false && this.state.type === "daily") ? this.state.weather.map((day) => <WeatherCard handleChange={this.handleChange} key={day.time} time={day.time} summary={day.summary} tempHigh={day.temperatureHigh} tempLow={day.temperatureLow} icon={day.icon} intRain={day.precipIntensity} probRain={day.precipProbability} windSpeed={day.windSpeed} windGust={day.windGust} sunrise={day.sunriseTime} sunset={day.sunsetTime} />) : undefined}
                                {(this.state.isLoading === false && this.state.type === "currently") ? this.state.weather.map((now) => <CurrentWeatherCard handleChange={this.handleChange} key={now.time} time={now.time} summary={now.summary} temp={now.temperature} icon={now.icon} intRain={now.precipIntensity} probRain={now.precipProbability} windSpeed={now.windSpeed} windGust={now.windGust} />) : undefined}
                                {(this.state.isLoading === false && this.state.type === "hourly") ? this.state.weather.map((hour) => <HourlyWeather handleChange={this.handleChange} key={hour.time} time={hour.time} summary={hour.summary} temp={hour.temperature} icon={hour.icon} intRain={hour.precipIntensity} windSpeed={hour.windSpeed} />) : undefined}
                            </div>
                            : <div className="spinner-container"><div className="bt-spinner"></div> </div>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
