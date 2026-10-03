const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    instructor: {
        type: String,
        default: ""
    },

    duration: {
        type: String,
        default: ""
    },

    studentsEnrolled: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Course", courseSchema);