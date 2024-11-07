const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const winston = require('winston');
require('dotenv').config();
const cors = require('cors'); // To handle cross-origin requests
const appointmentRoutes = require('./Presentation/routes/appointment');
const responsehelper = require('./Helpers/Responsehelper');
const responseCode = require('./Helpers/ResponseCode');
const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.COLLECTION_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


// Configure winston logger
const logger = winston.createLogger({
    level: 'info', // minimum log level to log
    format: winston.format.combine(
        winston.format.colorize(),  // Add color to log output
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
    ],
});


global.responsehelper = responsehelper;
global.responseCode = responseCode;
global.logger = logger;

// Use the routes
app.use('/api', appointmentRoutes);
// Routes
app.get('/health', (req, res) => {
    res.status(400).json({ message: err.message });
});

// Start the server
app.listen(port, () => {
    logger.info({ "message": `Server running on http://localhost:${port}` })
});
