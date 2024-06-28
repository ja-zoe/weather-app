import axios from 'axios'
import express from 'express'
import cors from 'cors'

const PORT = 8080
const app = express()

app.use(cors())

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))