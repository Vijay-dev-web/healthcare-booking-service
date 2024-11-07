const express = require('express');
const bookings = require('../Controller/Bookingscontroller');
const authcontroller = require('../Controller/Authcontroller');

const router = express.Router();

// GET: Get all appointments
router.get('/appoinments/doctor/:doctorid',authcontroller.verifyuser,bookings.getAppoinmentByDoctor);
router.get('/appoinments/pateinet/:pateinetid',authcontroller.verifyuser,bookings.getAppoinmentByPatinet);
//Book Appoinment
router.post('/appoinments',authcontroller.verifyuser,bookings.bookAppoinment);
//Book Appoinment
router.put('/appoinments',authcontroller.verifyuser,bookings.updateAppoinment);

module.exports = router;
