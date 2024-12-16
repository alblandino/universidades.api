import 'dotenv/config'

// Define the application configuration.
export const application = {
    port: process.env.PORT || 3000,
    database: {
        mongo_uri: process.env.MONGO_URI,
        configs: {
            autoIndex: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    }
}