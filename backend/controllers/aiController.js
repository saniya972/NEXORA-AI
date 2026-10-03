const classifyIssue = async (req, res) => {
    try {
        const { issue } = req.body;

        if (!issue) {
            return res.status(400).json({
                message: "Issue is required"
            });
        }

        const text = issue.toLowerCase();

        let category = "General";
        let priority = "Medium";
        let department = "Support";
        let aiResponse = "Your complaint has been received and will be reviewed.";

        // Category detection
        if (
            text.includes("payment") ||
            text.includes("fee") ||
            text.includes("refund")
        ) {
            category = "Payment";
            department = "Accounts";
            priority = "High";
            aiResponse = "Your payment-related issue has been routed to the Accounts department.";
        }
        else if (
            text.includes("enrollment") ||
            text.includes("admission") ||
            text.includes("enroll")
        ) {
            category = "Enrollment";
            department = "Admissions";
            priority = "High";
            aiResponse = "Your enrollment issue has been routed to the Admissions department.";
        }
        else if (
            text.includes("class") ||
            text.includes("recording") ||
            text.includes("course")
        ) {
            category = "Course Support";
            department = "Technical/Course Support";
            priority = "Medium";
            aiResponse = "Your course-related issue has been routed to Course Support.";
        }

        // Urgency detection
        if (
            text.includes("urgent") ||
            text.includes("emergency") ||
            text.includes("immediately")
        ) {
            priority = "High";
        }

        res.json({
            issue,
            category,
            priority,
            department,
            aiResponse
        });

    } catch (error) {
        res.status(500).json({
            message: "AI classification failed",
            error: error.message
        });
    }
};

const analyzeSentiment = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const text = message.toLowerCase();

        let sentiment = "Neutral";

        if (
            text.includes("angry") ||
            text.includes("bad") ||
            text.includes("failed") ||
            text.includes("problem") ||
            text.includes("worst") ||
            text.includes("hate") ||
            text.includes("not working") ||
            text.includes("disappointed")
        ) {
            sentiment = "Negative";
        }
        else if (
            text.includes("good") ||
            text.includes("great") ||
            text.includes("happy") ||
            text.includes("excellent") ||
            text.includes("thank")
        ) {
            sentiment = "Positive";
        }

        res.json({
            message,
            sentiment
        });

    } catch (error) {
        res.status(500).json({
            message: "Sentiment analysis failed",
            error: error.message
        });
    }
};

const chatbot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        const text = message.toLowerCase();

        let response = "I'm here to help. Please describe your issue.";

        if (text.includes("payment") || text.includes("fee")) {
            response = "For payment or fee issues, please contact the Accounts department.";
        }
        else if (text.includes("course") || text.includes("class")) {
            response = "For course or class-related issues, please contact Course Support.";
        }
        else if (text.includes("enrollment") || text.includes("admission")) {
            response = "For enrollment or admission issues, please contact the Admissions department.";
        }
        else if (text.includes("certificate")) {
            response = "For certificate-related queries, please contact the Academic Support department.";
        }
        else if (text.includes("hello") || text.includes("hi")) {
            response = "Hello! 👋 How can I help you today?";
        }

        res.json({
            message,
            response
        });

    } catch (error) {
        res.status(500).json({
            message: "Chatbot failed",
            error: error.message
        });
    }
};

module.exports = {
    classifyIssue,
     chatbot,
      analyzeSentiment
};