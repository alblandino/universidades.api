import mongoose from 'mongoose';

// Function to establish a connection to the database
const connect = async (app) => {

    // Reconnect interval time in milliseconds (5 seconds)
    const reconnectInterval = 5000;
    try {

        // Attempt to connect to MongoDB using the URI and configurations from the app object
        mongoose.connect(app.database.mongo_uri, app.database.configs);

        // Event listener for when the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('- Database disconnected, attempting to reconnect...');
            
            // Attempt to reconnect after the specified interval
            setTimeout(() => connect(app), reconnectInterval);
        });

        // Event listener for when the connection is re-established
        mongoose.connection.on('reconnected', () => {
            console.log('- Database reconnected');
        });

        // Event listener for when there is an error with the connection
        mongoose.connection.on('error', (error) => {
            console.error('- MongoDB connection error:', error);
        });
        console.log('- Database connected');
    } catch (error) {
        // Log an error and terminate the process if the connection fails
        console.error('- Database connection error');
        process.exit(1);
    }
};

export default connect;
