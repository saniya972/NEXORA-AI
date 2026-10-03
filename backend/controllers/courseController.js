const Course = require("../models/Course");

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        res.status(500).json({
            message: "Course creation failed",
            error: error.message
        });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.json(courses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses",
            error: error.message
        });
    }
};

module.exports = {
    createCourse,
    getCourses
};