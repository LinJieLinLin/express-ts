import app from './app'
import Log from './utils/log'

const port = app.get('port')
const server = app.listen(port, () =>
  Log.log(`Server started on port: ${port}`)
)

export default server
