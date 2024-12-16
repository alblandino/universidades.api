import express from 'express'
import { application } from './config'
import connect from './config/database'
import { universities, degrees, provinces } from './routes'

// Import the middlewares from the configuration file.
import { middlewares } from './config/middlewares'

// Create a new instance of the Express application.
const app = express()

// Database connection
connect(application)

// Apply the middlewares defined
app.use(middlewares);

// Use defined routes
app.use('/v1/carreras', degrees)
app.use('/v1/provincias', provinces)
app.use('/v1/universidades', universities)

// Start the server on port 3000 and display a message in the console when the server is ready.
app.listen(application.port, () => {
    console.log(`- Server is running on port ${application.port}`)
})
