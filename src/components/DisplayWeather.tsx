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

  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [shouldEffect, setShouldEffect] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let response1 = ''
  
        const initResponse = await fetch("https://api.ipify.org/?format=json")
        if(!initResponse.ok) throw new Error('Could not find ip!')
        const data1 = await initResponse.json()
        response1 = data1.ip
        console.log(response1)

        const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${import.meta.env.VITE_LOCATION_API_KEY}&ip=${response1}`)
        if(!response.ok) throw new Error('Could not find geolocation from ip!')
        const data = await response.json()

        setLocation(`${data.city.name} ${data.state.name}`)
        setShouldEffect(true)
        console.log(location)
        console.log(data)
      }
      catch(error){
        console.log(error)
        setLocation('New York')
        setShouldEffect(true)
      }
    }
    fetchLocation()
  },[])

  useEffect(() => {
    if(shouldEffect == true){
      console.log(location)
      fetchData()
    }
  },[shouldEffect])

  const fetchData = async () => {
    try{
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
      if(!response.ok) throw new Error("Could not Fetch Data!!!!")
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
      console.error(error)
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
              <h2>{weatherData?.humidity}{weatherData?.humidity !== 'null' ? "%" : null}</h2>  
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