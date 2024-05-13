const express = require('express');
const Appointment = require('../models/appointments'); // Changed import to appointment

const router = express.Router();

// Save appointment
router.post('/appointment/save', async (req, res) => { // Changed route to /appointment/save
    try {
        let newAppointment = new Appointment(req.body); // Changed model to Appointment
        await newAppointment.save();
        return res.status(200).json({
            success: "Appointment saved successfully" // Updated success message
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message // Changed error handling
        });
    }
});

// Get appointments
router.get('/appointments', async (req, res) => { // Changed route to /appointments
    try {
        const appointments = await Appointment.find().exec(); // Changed model to Appointment
        res.status(200).json({ success: true, existingAppointments: appointments }); // Updated response
    } catch (error) {
        console.error('Error in /appointments route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific appointment
router.get("/appointment/:id", (req, res) => { // Changed route to /appointment/:id
    let appointmentId = req.params.id;

    Appointment.findById(appointmentId) // Changed model to Appointment
        .then(appointment => {
            if (!appointment) {
                return res.status(404).json({ success: false, error: "Appointment not found." });
            }

            return res.status(200).json({
                success: true,
                appointment
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message });
        });
});

// Update appointment
router.put('/appointment/update/:id', async (req, res) => { // Changed route to /appointment/update/:id
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return res.status(200).json({
            success: 'Update Successfully',
            updatedAppointment
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// Delete appointment
router.delete('/appointment/delete/:id', async (req, res) => { // Changed route to /appointment/delete/:id
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({
                message: "Appointment not found for deletion"
            });
        }

        return res.status(200).json({
            message: "Delete Successful",
            deletedAppointment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
});

// GET appointments by doctor ID
router.get('/appointments/:doctor', async (req, res) => { // Changed route to /appointments/:doctor
    try {
        const { doctor } = req.params;
        const appointments = await Appointment.find({ doctor });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
