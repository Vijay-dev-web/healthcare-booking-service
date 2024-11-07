const express = require('express');
const Appointment = require('../Model/appointment');
const bookings = require('../Controller/Bookingscontroller');
const authcontroller = require('../Controller/Authcontroller');
const router = express.Router();

// GET: Get all appointments
router.get('/appoinments/:pateinetid/:doctorid', authcontroller.verifyuser,bookings.getAppoinment);

//Book Appoinment
// router.post('/appoinments', authcontroller.verifyuser, bookings.bookAppoinment);
router.post('/appoinments', bookings.bookAppoinment);

//Book Appoinment
router.put('/appoinments', authcontroller.verifyuser, bookings.updateAppoinment);


module.exports = router;
