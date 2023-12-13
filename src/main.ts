import express from 'express'
import process from 'process'
import {DB} from '@/config/database'

const app = express()

try {
  DB.authenticate()
      .then(() => {
        return DB.sync();
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Running on port ${process.env.PORT}`)
        })
      })
} catch(e) {
  console.error(e)
}
