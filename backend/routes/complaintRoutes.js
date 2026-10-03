const express = require("express");

const router = express.Router();

// Temporary storage for hackathon demo
let complaints = [];

const isDuplicateComplaint = (newIssue) => {
    return complaints.some(
        (complaint) =>
            complaint.issue.toLowerCase().trim() ===
            newIssue.toLowerCase().trim()
    );
};

router.post("/", async (req, res) => {
    const duplicate = isDuplicateComplaint(req.body.issue);

if (duplicate) {
    return res.status(409).json({
        message: "Duplicate complaint detected",
        duplicate: true
    });
}
    try {

    const isEscalated =
    req.body.priority === "High" &&
    req.body.sentiment === "Negative"; 

        const complaint = {
            _id: Date.now().toString(),
            studentId: req.body.studentId,
            issue: req.body.issue,
            category: req.body.category,
            priority: req.body.priority,
            department: req.body.department,
            status: isEscalated ? "Escalated" : "Pending",
            aiResponse: req.body.aiResponse,
            createdAt: new Date()
        };

        complaints.push(complaint);

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Complaint submission failed",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    res.json(complaints);
});

// Update complaint status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const complaint = complaints.find(
            (item) => item._id === req.params.id
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        complaint.status = status;

        res.json({
            message: "Complaint status updated successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Status update failed",
            error: error.message
        });
    }
});

module.exports = router;