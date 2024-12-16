import morgan  from 'morgan';

// Middleware for logging incoming HTTP requests.
const httpRequestLogger = (req, res, next) => {
    morgan('dev')(req, res, next)
};

// Middlewares exports
export const middlewares = [
    httpRequestLogger,
];
