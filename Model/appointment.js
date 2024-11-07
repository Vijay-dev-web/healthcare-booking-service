const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    patient_name: { type: String, required: true },
    doctor_name: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    reason: { type: String, required: true },
    notes: { type: String, required: true },
    active_status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
