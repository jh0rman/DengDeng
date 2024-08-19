import { Cromo } from 'cromo'
import { errorHandler } from './middleware/error-handler'

const cromo = new Cromo()

cromo.setMiddleware([
  errorHandler
])

cromo.start(server => {
  console.info(`➜  Local:   ${server.url}`)
})
