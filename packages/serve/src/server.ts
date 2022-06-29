import { createApp } from './app'
import Log from './utils/log'
import { ConnectDb } from './utils/db'

// Connect to MongoDB
ConnectDb()
const app = createApp()
const port = app.get('port')
const server = app.listen(port, () =>
  Log.log(`Server started on port: ${port}`)
)

export default server
