import express from 'express'
import process from 'process'
import cors from 'cors'
import {sequelize} from '@/config/database'
import {setTableRelationships} from '@/models/utils/setTableRelationships.ts'


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

try {
  sequelize.authenticate()
      .then(() => {
        setTableRelationships();
        return sequelize.sync();
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Running on port ${process.env.PORT}`)
        })
      })
} catch(e) {
  console.error('Unable to connect to the database:', e);
}
