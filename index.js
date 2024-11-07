const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors'); // To handle cross-origin requests
const appointmentRoutes = require('./routes/appointment');
const responsehelper = require('./Helpers/Responsehelper');
const responseCode = require('./Helpers/ResponseCode');

const app = express();
const port =  process.env.PORT;

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

global.responsehelper = responsehelper;
global.responseCode = responseCode;

  // Use the routes
  app.use('/api', appointmentRoutes);
// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is Healthy!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
