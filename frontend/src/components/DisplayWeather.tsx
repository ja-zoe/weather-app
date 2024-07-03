import { useState, useEffect } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TbUvIndex } from "react-icons/tb";


import './weather.css'


const DisplayWeather = () => {

  interface WeatherData {
    error?: string,
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

  const [location, setLocation] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [ip, setIp] = useState<string | null>(null)
  const [shouldEffect, setShouldEffect] = useState<boolean>(false)

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org/?format=json")
        if(!ipResponse.ok) throw new Error('Could not find ip!')
        const ipData = await ipResponse.json()
        setShouldEffect(true)
        setIp(ipData.ip)
      }
      catch(error){
        console.error("Could not fetch IP!")
        fetchData()
      }
    }
    fetchIP()
  },[])

  useEffect(() => {
    if(shouldEffect) fetchData()
  },[ip])


  const fetchData = async () => {
    try {
      const response = await fetch(`https://thewevuh.netlify.app/api/location?ip=${ip}&location=${location}`)
      if(!response.ok) throw new Error("Couldn't Receive Location Data!")
      const data = await response.json()
      console.log(data)
      setWeatherData({
        name: data.name,
        region: data.region,
        hiTemp: data.hiTemp,
        loTemp: data.loTemp,
        temp: data.temp,
        condition: data.condition,
        humidity: data.humidity,
        uv: data.uv,
        country: data.country
      })
    }
    catch(error) {
      let message = ''
      if(error instanceof Error) message = error.message
    
      console.log(error)
      setWeatherData({
        name: 'null',
        region: message,
        hiTemp: 'null',
        loTemp: 'null',
        temp: 'null',
        condition: 'null',
        humidity: 'null',
        uv: 'null',
        country: 'null'
      })
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