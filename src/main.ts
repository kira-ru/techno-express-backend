import {errorMiddleware} from '@/middlewares/error.middleware.ts'
import express from 'express'
import process from 'process'
import cors from 'cors'
import {sequelize} from '@/config/database'
import {setTableRelationships} from '@/models/utils/setTableRelationships.ts'
import {routes} from '@/routes'
import fileUploader from 'express-fileupload'

const app = express()

app.use(function(req, res, next) {
  console.log('Запрос: ' + req.method + ' ' + req.url);
  next();
});

app.use(cors())
app.use(express.json())
app.use(fileUploader())
app.use(routes)

//middleware
app.use(errorMiddleware);

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
