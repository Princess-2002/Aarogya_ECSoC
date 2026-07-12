const mongoose = require("mongoose");

// patientName/patientAge are captured directly on the appointment (rather
// than looked up from the linked `patient` User) so the record still makes
// sense even if the account it references is later edited or removed, and
// so a booking can carry details (e.g. the age at time of visit) that may
// differ from what's on the user's profile.
//
// `status` is free-text with a "Pending" default; there's no enum yet
// because the accept/reject flow that would set it to another value isn't
// implemented on the backend (see server.js "Book Appointment" route).
const AppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    symptoms: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
