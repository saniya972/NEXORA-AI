let dashboardData = {
    totalStudents: 1,
    totalCourses: 3,
    totalComplaints: 1,
    pendingComplaints: 0,
    resolvedComplaints: 1,
    highPriorityComplaints: 1
};

const getSupportAnalytics = async (req, res) => {
    try {
        res.json({
            totalComplaints: 10,
            highPriorityComplaints: 4,
            escalatedComplaints: 2,
            commonIssue: "Payment",
            trend: "Payment-related complaints are increasing"
        });
    } catch (error) {
        res.status(500).json({
            message: "Analytics failed",
            error: error.message
        });
    }
};

const getDashboardStats = async (req, res) => {
    res.json(dashboardData);
};

module.exports = {
    getDashboardStats,
    getSupportAnalytics
};