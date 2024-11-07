const Appointment = require('../../Data/Model/appointment');
class Bookings {

    constructor() {
    }
    /*
    DESC : Book Appoinmnet 
    @params : JSON 
    @return JSON/ARRAY
    **/
    async bookAppoinment(req, res) {
        const { user_id, doctor_id, appointmentDate, appointmentTime, reason, notes,patient_name,doctor_name } = req.body;
        const active_status = 1;
        const appointment = new Appointment({
            user_id,
            doctor_id,
            patient_name,
            doctor_name,
            appointmentDate,
            appointmentTime,
            reason,
            notes,
            active_status
        });
        try {
            const newAppointment = await appointment.save();
            res.status(201).json(newAppointment);
        } catch (err) {
            logger.error({error:err})
            res.status(400).json({ message: err.message });
        }
    }
    /*
   DESC : Update Appoinmnet 
   @params : JSON 
   @return JSON/ARRAY
   **/
    async updateAppoinment(req, res) {
        const { booking_id, user_id, doctor_id, appointmentDate, appointmentTime, reason, notes } = req.body;
        const active_status = 1;
        const payload = {
            user_id,
            doctor_id,
            appointmentDate,
            appointmentTime,
            reason,
            notes,
            active_status
        }
        const filter = { _id: booking_id };
        try {
            const updateDocs = await Appointment.findOneAndUpdate(filter, payload, {
                new: true
            });

            res.status(200).json(updateDocs);
        } catch (err) {
            logger.error({error:err})
            res.status(400).json({ message: err.message });
        }
    }

    /*
   DESC : GET Appoinmnet 
   @params : JSON 
   @return JSON/ARRAY
   **/
    async getAppoinmentByDoctor(req, res) {
        const { doctorid } = req.params;
        const filter = {
            doctor_id: doctorid
        }
        try {
            const getAppoinmentData = await Appointment.find(filter, {
                new: true
            }).select('user_id doctor_id appointmentDate appointmentTime patient_name  reason notes active_status');
            res.status(200).json(getAppoinmentData);
        } catch (err) {
            logger.error({error:err})
            res.status(400).json({ message: err.message });
        }
    }
      /*
   DESC : GET Appoinmnet 
   @params : JSON 
   @return JSON/ARRAY
   **/
   async getAppoinmentByPatinet(req, res) {
    const { pateinetid } = req.params;
    const filter = {
        user_id: pateinetid
    }

    try {
        const getAppoinmentData = await Appointment.find(filter, {
            new: true
        }).select('user_id doctor_id patient_name doctor_name doctor_name appointmentDate appointmentTime reason notes active_status');
        res.status(200).json(getAppoinmentData);
    } catch (err) {
        logger.error({error:err})
        res.status(400).json({ message: err.message });
    }
}
}

const bookings = new Bookings();
module.exports = bookings;
