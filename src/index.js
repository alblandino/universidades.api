import express from 'express'
import { application } from './config'
import connect from './config/database'
import { University } from './models/university'

// Import the middlewares from the configuration file.
import { middlewares } from './config/middlewares'

// Create a new instance of the Express application.
const app = express()

// Database connection
connect(application)

// Apply the middlewares defined
app.use(middlewares);

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Start the server on port 3000 and display a message in the console when the server is ready.
app.listen(application.port, () => {
    console.log(`- Server is running on port ${application.port}`)
})
