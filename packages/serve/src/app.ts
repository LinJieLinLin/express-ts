import express from 'express'
import { config } from 'dotenv'

const app = express()

// loads the .env file into process.env
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
const envDir = process.cwd()
config({ path: `${envDir}/${envFile}` })

// set global variable
app.set('port', process.env.PORT || 8080)
export default app
