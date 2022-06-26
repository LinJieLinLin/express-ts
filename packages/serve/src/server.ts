import bodyParser from 'body-parser'
import cors from 'cors'
import user from './routes/api/user'
import pub from './routes/api/pub'
import requestID from 'express-request-id'
import auth from './middleware/auth'
import app from './app'
import { ConnectDb } from './utils/db'

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

app.use('/api/pub', pub)
app.use(auth)
app.use('/api/user', user)

const port = app.get('port')
const server = app.listen(port, () =>
  console.log(`Server started on port: ${port}`)
)
export default server
