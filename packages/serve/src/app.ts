import express from 'express'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import user from './routes/api/user'
import pub from './routes/api/pub'
import requestID from 'express-request-id'
import auth from './middleware/auth'
import { ConnectDb } from './utils/db'
import Log from './utils/log'
import morganBody from 'morgan-body'

const app = express()

// loads the .env file into process.env
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
const envDir = process.cwd()
config({ path: `${envDir}/${envFile}` })

// set global variable
app.set('port', process.env.PORT || 8080)
app.set('nodeEnv', process.env.NODE_ENV || 8080)

app.get('/', (_req, res) => {
  res.send('API Running')
})

// Connect to MongoDB
ConnectDb()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(requestID())
app.use(cors())
morganBody(app, {
  noColors: true,
  prettify: false,
  logReqUserAgent: false,
  logRequestId: true,
  stream: {
    write: (message) => {
      Log.info(message)
      return true
    },
  },
})

app.use('/api/pub', pub)
app.use(auth)
app.use('/api/user', user)

export default app
