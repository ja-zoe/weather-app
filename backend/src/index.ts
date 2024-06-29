import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()

const PORT = 8080
const app = express()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

app.use(cors())

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))

app.get('/api/location', async (req, res) => {
    const ip = req.query.ip || null
    let location = req.query.location || "New York"

    if(ip && location === 'null') {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.LOCATION_API_KEY}&ip=${ip}`)
            if(!response.ok) throw new Error('Could not find geolocation from IP!')
            const data = await response.json()
            location = `${data.city.name} ${data.state.name}`
        }
        catch(error) {
            location = 'New York'
            console.error(error)
        }
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
        if(!response.ok) throw new Error("Could not find location!")
        const data = await response.json()
        res.json({
            name: data.location.name,
            region: data.location.region,
            hiTemp: data.forecast.forecastday[0].day.maxtemp_f,
            loTemp: data.forecast.forecastday[0].day.mintemp_f,
            temp: data.current.temp_f,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            uv: data.current.uv,
            country: data.location.country
        })
    }
    catch(error) {
        console.error(error)
        res.json({
            error: error.message,
            name: "null",
            region: "null",
            hiTemp: "null",
            loTemp: "null",
            temp: "Unlisted",
            condition: "Not a Real Place",
            humidity: "null",
            uv: "null",
            country: "null"
        })
    }

})