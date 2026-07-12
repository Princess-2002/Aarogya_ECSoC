const mongoose = require("mongoose");

// Single collection for both patients and doctors, distinguished by `role`.
// specialization/experience/bio are only meaningful for doctor documents;
// they're left as plain optional fields (not required/validated per role)
// since Mongoose doesn't support conditional-required-by-sibling-field out
// of the box without a custom validator.
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Stored as a bcrypt hash, never plaintext — see server.js signup handler
    role: { type: String, enum: ["doctor", "patient"] }, // Define roles
    specialization: String, // For doctors
    experience: String, // Doctor's experience in years
    bio: String, // Short bio for doctor profile
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }] // Link to appointments
});

module.exports = mongoose.model("User", UserSchema);
