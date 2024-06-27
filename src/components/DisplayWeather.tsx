import { useState, useEffect } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";


import './weather.css'


const DisplayWeather = () => {

  interface WeatherData {
    name: string,
    region: string,
    hiTemp: number | string,
    loTemp: number | string,
    temp: number | string,
    condition: string,
    humidity: number | string,
    uv: number | string,
    country: string | null
  }

  const apiKey: string = "5b661caaeb7c4a76983214453242606"
  const [location, setLocation] = useState('New York')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    try{
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`)
      if(!response.ok) throw new Error("Could not Fetch Data")
      const data = await response.json()
      console.log(data)

      const name = data.location.name
      const region = data.location.region
      const hiTemp = data.forecast.forecastday[0].day.maxtemp_f
      const loTemp = data.forecast.forecastday[0].day.mintemp_f
      const temp = data.current.temp_f
      const condition = data.current.condition.text
      const humidity = data.current.humidity
      const uv = data.current.uv
      const country = data.location.country

      setWeatherData({name, country, region, hiTemp, loTemp, temp, condition, humidity, uv})
    }
    catch(error){
      console.log(error)
      const name = 'null'
      const region = 'null'
      const hiTemp = 'null'
      const loTemp = 'null'
      const temp = 'Unlisted'
      const condition = 'Not a Real Place'
      const humidity = 'null'
      const uv = 'null'
      const country = 'null'

      setWeatherData({name, region, country, hiTemp, loTemp, temp, condition, humidity, uv})
    }
  }


  return (
    <div className="container">
      <div className="weather">

        <div className="searchArea">
          <input className="input" type="text" placeholder="Enter A City" onChange={e => setLocation(e.target.value)}/>
          <IoSearchSharp className="search" onClick={fetchData}/>
        </div>
        
        <div className="location">
          <h2>{weatherData?.name}</h2>
          <div className="rCountry">
            <p>{weatherData?.region}, {weatherData?.country}</p>
          </div>
        </div>

        <div className="forecast">
          <h1>{weatherData?.temp}{weatherData?.temp !== 'Unlisted' ? "°F" : null}</h1>
          <p className="condition">{weatherData?.condition}</p>

          <div className="hiLow">
            <div className="jawn">
              <FaArrowUp className="icon1"/>
              <p>{weatherData?.hiTemp}{weatherData?.hiTemp !== 'null' ? "°F" : null}</p>
            </div>
            <div className="jawn">
              <FaArrowDown className="icon1"/>
              <p>{weatherData?.loTemp}{weatherData?.loTemp !== 'null' ? "°F" : null}</p>
            </div>
          </div>

          <div className="others">
            <div className="jawn2">
              <WiHumidity className="icon2 humidityIcon"/>
              <h2>{weatherData?.humidity}{weatherData?.humidity !== 'null' ? "°F" : null}</h2>  
            </div>
            <div className="jawn2">
              <TbUvIndex className="icon2 uvIcon"/>
              <h2 className="uvh2">{weatherData?.uv}</h2>
            </div>
          </div>

        </div>
      
      </div>
    </div>
  )
}

export default DisplayWeather