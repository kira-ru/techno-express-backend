import express from 'express'
import process from 'process'
import {config} from 'dotenv'

config()
const app = express()
app.get('/', (request, response) => {
  response.send('Hello world!')
})
app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})
