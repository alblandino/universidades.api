import morgan  from 'morgan';
import { v4 as uuidv4 } from 'uuid';

// Middleware for logging incoming HTTP requests.
const httpRequestLogger = (req, res, next) => {
    morgan('dev')(req, res, next)
};

// Middleware for adding metadata to HTTP responses.
const httpMetadata = (req, res, next) => {
    const { json } = res
    res.json = originalResponse => {
        const response = {
            ...originalResponse,
            metadata: {
                timestamp: new Date().toISOString(),
                requestId: req.headers['x-request-id'] || uuidv4(),
            }
        }
        return json.call(res, response)
    }
    next()
}

// Middlewares exports
export const middlewares = [
    httpRequestLogger,
    httpMetadata,
];
