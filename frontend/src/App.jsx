import "./App.css";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [issue, setIssue] = useState("");

  const [chatMessage, setChatMessage] = useState("");
const [chatResponse, setChatResponse] = useState("");

const [sentiment, setSentiment] = useState("");
  const [result, setResult] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);

  // COURSES
  const courses = [
    {
      title: "Full Stack Web Development",
      instructor: "NEXORA Academy",
      duration: "12 Weeks",
      progress: "75%"
    },
    {
      title: "Java Programming",
      instructor: "NEXORA Academy",
      duration: "8 Weeks",
      progress: "60%"
    },
    {
      title: "Python & AI Basics",
      instructor: "NEXORA Academy",
      duration: "10 Weeks",
      progress: "45%"
    }
  ];

  // LEARNING PROGRESS
  const attendance = 88;
  const overallProgress = 72;

  const studentProfile = {
  name: "Saniya",
  email: "student@nexora.com",
  course: "Computer Science & Engineering",
  enrollmentStatus: "Active",
  studentId: "NEXORA-2026-001"
};

  // CLASS SCHEDULE
  const schedule = [
    {
      day: "Monday",
      time: "10:00 AM - 11:00 AM",
      subject: "Java Programming"
    },
    {
      day: "Wednesday",
      time: "11:00 AM - 12:00 PM",
      subject: "Web Development"
    },
    {
      day: "Friday",
      time: "10:00 AM - 11:00 AM",
      subject: "Python & AI"
    }
  ];

  // LOGIN
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsLoggedIn(true);
  };

  // REGISTER
  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    alert("Registration successful! Please login.");

    setShowRegister(false);
    setName("");
    setPassword("");
  };

  // SUBMIT TICKET
  const submitTicket = async () => {
  if (!result) return;

  try {
    // Analyze sentiment automatically
    const sentimentResponse = await fetch(
      "https://nexora-ai-backend-p42m.onrender.com   /api/ai/sentiment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: result.issue
        })
      }
    );

    const sentimentData = await sentimentResponse.json();

    const response = await fetch(
      "https://nexora-ai-backend-p42m.onrender.com   /api/complaints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: "507f1f77bcf86cd799439011",
          issue: result.issue,
          category: result.category,
          priority: result.priority,
          department: result.department,
          aiResponse: result.aiResponse,
          sentiment: sentimentData.sentiment
        })
      }
    );

    const data = await response.json();

    setTicket(data);

    loadComplaints();

  } catch (error) {
    console.log(error);
  }
};

  // AI CLASSIFICATION
  const classifyIssue = async () => {
    if (!issue.trim()) {
      alert("Please describe your problem");
      return;
    }

    try {
      const response = await fetch(
        "https://nexora-ai-backend-p42m.onrender.com   /api/ai/classify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            issue: issue
          })
        }
      );



      const data = await response.json();

      setResult(data);
      setTicket(null);
    } catch (error) {
      console.log(error);
      alert("Unable to connect to AI support");
    }
  };

  const sendChatMessage = async () => {
  if (!chatMessage.trim()) {
    return;
  }

  try {
    const response = await fetch("https://nexora-ai-backend-p42m.onrender.com   /api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: chatMessage
      })
    });

    const data = await response.json();

    setChatResponse(data.response);
  } catch (error) {
    setChatResponse("Unable to connect to AI assistant.");
  }
};

const checkSentiment = async () => {
  if (!chatMessage.trim()) {
    return;
  }

  try {
    const response = await fetch("https://nexora-ai-backend-p42m.onrender.com   /api/ai/sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: chatMessage
      })
    });

    const data = await response.json();

    setSentiment(data.sentiment);
  } catch (error) {
    setSentiment("Unable to analyze");
  }
};


  // SUPPORT ANALYTICS
  const loadAnalytics = async () => {
    try {
      const response = await fetch(
        "https://nexora-ai-backend-p42m.onrender.com   /api/admin/analytics"
      );

      const data = await response.json();

      setAnalytics(data);
    } catch (error) {
      console.log("Analytics loading failed");
    }
  };
  // ADMIN STATS
  const loadAdminStats = async () => {

    const loadAnalytics = async () => {
  try {
    const response = await fetch(
      "https://nexora-ai-backend-p42m.onrender.com   /api/admin/analytics"
    );

    const data = await response.json();

    setAnalytics(data);
  } catch (error) {
    console.log("Analytics loading failed");
  }
};
    try {
      const response = await fetch(
        "https://nexora-ai-backend-p42m.onrender.com   /api/admin/dashboard"
      );

      const data = await response.json();

      setAdminStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD COMPLAINTS
  const loadComplaints = async () => {
    try {
      const response = await fetch(
        "https://nexora-ai-backend-p42m.onrender.com   /api/complaints"
      );

      const data = await response.json();

      setComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  // RESOLVE COMPLAINT
  const resolveComplaint = async (id) => {
    try {
      const response = await fetch(
        `https://nexora-ai-backend-p42m.onrender.com   /api/complaints/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: "Resolved"
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id
              ? data.complaint
              : complaint
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // LOGIN / REGISTER SCREEN
  if (!isLoggedIn) {
    return (
      <div className="app">

        <header className="header">
          <h1>NEXORA AI</h1>
          <p>
            Smart Student Support & Complaint Management
          </p>
        </header>

        <main className="dashboard">

          <div className="welcome-card">

            <h2>
              {showRegister
                ? "🎓 Create Student Account"
                : "🔐 Student Login"}
            </h2>

            <p>
              {showRegister
                ? "Register to access your NEXORA AI student dashboard."
                : "Login to access your student support dashboard."}
            </p>

            {showRegister && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showRegister ? (
              <button onClick={handleRegister}>
                📝 Register
              </button>
            ) : (
              <button onClick={handleLogin}>
                🔐 Login
              </button>
            )}

            <p style={{ marginTop: "15px" }}>
              {showRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>

            <button
              onClick={() =>
                setShowRegister(!showRegister)
              }
            >
              {showRegister
                ? "Go to Login"
                : "Create New Account"}
            </button>

          </div>

        </main>

      </div>
    );
  }

  // MAIN DASHBOARD
  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <h1>NEXORA AI</h1>

        <p>
          Smart Student Support & Complaint Management
        </p>

        <button
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>

      </header>

      <main className="dashboard">

        {/* WELCOME */}

        <div className="welcome-card">

          <h2>
            Welcome to NEXORA AI 👋
          </h2>

          <p>
            Get support, submit complaints, track issues
            and manage your academic activities from one place.
          </p>

        </div>

        {/* AI SUPPORT */}

        <div className="ai-support">


          <div className="chatbot">
  <h2>🤖 AI Chatbot</h2>

  <input
    type="text"
    placeholder="Ask your question..."
    value={chatMessage}
    onChange={(e) => setChatMessage(e.target.value)}
  />

  <button onClick={sendChatMessage}>
    Ask AI
  </button>

  {chatResponse && (
    <div className="result">
      <p><strong>AI:</strong> {chatResponse}</p>
    </div>
  )}

  <button onClick={checkSentiment}>
  Analyze Sentiment
</button>

{sentiment && (
  <div className="result">
    <p>
      <strong>Sentiment:</strong> {sentiment}
    </p>
  </div>
)}
</div>

          <h2>
            🤖 AI Support Assistant
          </h2>

          <textarea
            placeholder="Describe your problem..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          <button onClick={classifyIssue}>
            Analyze My Issue
          </button>

          {result && (
            <button onClick={submitTicket}>
              🎫 Create Support Ticket
            </button>
          )}

          {result && (
            <div className="result">

              <p>
                <strong>Category:</strong>{" "}
                {result.category}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                {result.priority}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {result.department}
              </p>

              <p>
                <strong>AI Response:</strong>{" "}
                {result.aiResponse}
              </p>

            </div>
          )}

          {ticket && (
            <div className="result">

              <p>
                <strong>
                  🎫 Ticket Created:
                </strong>{" "}
                Successfully
              </p>

              <p>
                Your complaint has been submitted
                for support.
              </p>

            </div>
          )}

        </div>

        {/* ADMIN DASHBOARD */}

        <div className="admin-section">

  <div className="admin-header">

    <div>
      <p className="admin-label">ADMIN PANEL</p>

      <h2>📊 Admin Dashboard</h2>

      <p className="admin-subtitle">
        Monitor students, courses and support activity
      </p>
    </div>

    <div className="admin-actions">

      <button onClick={loadAdminStats}>
        📊 Dashboard Statistics
      </button>

      <button onClick={loadAnalytics}>
        📈 Support Analytics
      </button>

    </div>

  </div>


  {adminStats && (

    <div className="admin-stats">

      <div className="admin-stat-card">
        <div className="stat-icon">👨‍🎓</div>

        <div>
          <p>Total Students</p>
          <h3>{adminStats.totalStudents}</h3>
          <span>Registered students</span>
        </div>
      </div>


      <div className="admin-stat-card">
        <div className="stat-icon">📚</div>

        <div>
          <p>Total Courses</p>
          <h3>{adminStats.totalCourses}</h3>
          <span>Available courses</span>
        </div>
      </div>


      <div className="admin-stat-card">
        <div className="stat-icon">🎫</div>

        <div>
          <p>Total Complaints</p>
          <h3>{adminStats.totalComplaints}</h3>
          <span>Support requests</span>
        </div>
      </div>


      <div className="admin-stat-card priority-card">
        <div className="stat-icon">🚨</div>

        <div>
          <p>High Priority</p>
          <h3>{adminStats.highPriorityComplaints}</h3>
          <span>Needs attention</span>
        </div>
      </div>

    </div>

  )}


  {analytics && (

    <div className="analytics-section">

      <h3>📈 Support Analytics</h3>

      <div className="analytics-grid">

        <div className="analytics-card">
          <span>📋</span>
          <p>Total Complaints</p>
          <strong>{analytics.totalComplaints}</strong>
        </div>

        <div className="analytics-card">
          <span>🚨</span>
          <p>High Priority</p>
          <strong>{analytics.highPriorityComplaints}</strong>
        </div>

        <div className="analytics-card">
          <span>⚠️</span>
          <p>Escalated</p>
          <strong>{analytics.escalatedComplaints}</strong>
        </div>

        <div className="analytics-card">
          <span>🔍</span>
          <p>Common Issue</p>
          <strong>{analytics.commonIssue}</strong>
        </div>

      </div>

      <div className="trend-box">
        <span>📊</span>

        <div>
          <p>Current Support Trend</p>
          <strong>{analytics.trend}</strong>
        </div>
      </div>

    </div>

  )}


  <div className="complaint-control">

    <div>
      <h3>🎫 Complaint Management</h3>

      <p>
        Review and manage student support requests
      </p>
    </div>

    <button onClick={loadComplaints}>
      📋 View Complaints
    </button>

  </div>


  {complaints.length > 0 && (

    <div className="complaints-list">

      <h2>🎫 Complaint List</h2>

      {complaints.map((complaint) => (

        <div
          className="complaint-card"
          key={complaint._id}
        >

          <div className="complaint-top">

            <h3>{complaint.issue}</h3>

            <span
              className={
                complaint.status === "Escalated"
                  ? "status escalated"
                  : complaint.status === "Resolved"
                  ? "status resolved"
                  : "status pending"
              }
            >
              {complaint.status}
            </span>

          </div>


          <div className="complaint-details">

            <div>
              <span>Category</span>
              <strong>{complaint.category}</strong>
            </div>

            <div>
              <span>Priority</span>
              <strong>{complaint.priority}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{complaint.department}</strong>
            </div>

          </div>


          {complaint.status === "Pending" && (

            <button
              onClick={() =>
                resolveComplaint(complaint._id)
              }
            >
              ✅ Resolve Complaint
            </button>

          )}

        </div>

      ))}

    </div>

  )}

</div>

        {/* LEARNING PROGRESS */}

        <div className="welcome-card">

          <h2>
            📈 My Learning Progress
          </h2>

          <p>
            <strong>Attendance:</strong>{" "}
            {attendance}%
          </p>

          <p>
            <strong>Overall Progress:</strong>{" "}
            {overallProgress}%
          </p>

        </div>

        {/* CLASS SCHEDULE */}

        <div className="welcome-card">

          <h2>
            🗓️ Class Schedule
          </h2>

          {schedule.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px"
              }}
            >

              <strong>
                {item.day}
              </strong>

              <p>
                {item.time}
              </p>

              <p>
                {item.subject}
              </p>

            </div>
          ))}

        </div>

        {/* LEARNING RESOURCES */}

        <div className="welcome-card">

          <h2>
            📚 Learning Resources
          </h2>

          <p>
            📄 Java Programming Notes
          </p>

          <p>
            🎥 Web Development Recordings
          </p>

          <p>
            📘 Python & AI Study Material
          </p>

          <p>
            🏆 Course Certificates
          </p>

        </div>

        {/* MAIN CARDS */}

        <div className="cards">

          {/* AI SUPPORT CARD */}

          <div className="card">

            <h3>
              🤖 AI Support
            </h3>

            <p>
              Describe your problem and let AI
              classify and route it.
            </p>

          </div>

          {/* MY COURSES */}

          <div className="card">

            <h3>
              📚 My Courses
            </h3>

            {courses.map((course, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "15px"
                }}
              >

                <strong>
                  {course.title}
                </strong>

                <p>
                  Instructor:{" "}
                  {course.instructor}
                </p>

                <p>
                  Duration:{" "}
                  {course.duration}
                </p>

                <p>
                  Progress:{" "}
                  {course.progress}
                </p>

              </div>
            ))}

          </div>

          {/* COMPLAINTS */}

          <div className="card">

            <h3>
              🎫 Complaints
            </h3>

            <p>
              Submit and track your support complaints.
            </p>

          </div>

          {/* DASHBOARD */}

          <div className="card">

            <h3>
              📊 Dashboard
            </h3>

            <p>
              View your student activity and
              support status.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;