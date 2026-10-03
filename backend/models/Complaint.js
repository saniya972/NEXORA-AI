const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    issue: {
        type: String,
        required: true
    },

    category: {
        type: String,
        default: "General"
    },

    priority: {
        type: String,
        default: "Medium"
    },

    department: {
        type: String,
        default: "Support"
    },

    status: {
        type: String,
        default: "Pending"
    },

    aiResponse: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Complaint", complaintSchema);