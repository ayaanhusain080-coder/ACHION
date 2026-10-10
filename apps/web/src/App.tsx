import { useState } from "react";

// @ts-expect-error CSS imports are handled by the bundler in this project
import "./App.css";

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Command Center", icon: "⌂" },
  { id: "projects", label: "Projects", icon: "◈" },
  { id: "tasks", label: "Tasks", icon: "✓" },
  { id: "analytics", label: "Analytics", icon: "◫" },
  { id: "team", label: "Team", icon: "◎" },
];

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+18%",
    positive: true,
    icon: "◈",
  },
  {
    title: "Tasks Completed",
    value: "84",
    change: "+24%",
    positive: true,
    icon: "✓",
  },
  {
    title: "Team Members",
    value: "08",
    change: "+2",
    positive: true,
    icon: "◎",
  },
  {
    title: "System Health",
    value: "98.6%",
    change: "Stable",
    positive: true,
    icon: "◉",
  },
];

const projects = [
  {
    name: "ACHION Core",
    description: "Central command and management system",
    progress: 78,
    status: "In Progress",
    statusClass: "progress",
  },
  {
    name: "AI Automation",
    description: "Intelligent workflow automation",
    progress: 62,
    status: "In Progress",
    statusClass: "progress",
  },
  {
    name: "Analytics Engine",
    description: "Real-time data and insights",
    progress: 91,
    status: "Almost Done",
    statusClass: "success",
  },
];

const activities = [
  {
    title: "New project created",
    description: "ACHION Core was added to the workspace.",
    time: "12 min ago",
    icon: "＋",
  },
  {
    title: "Task completed",
    description: "Authentication module marked complete.",
    time: "34 min ago",
    icon: "✓",
  },
  {
    title: "Team update",
    description: "A new member joined the frontend team.",
    time: "1 hr ago",
    icon: "◎",
  },
  {
    title: "System check",
    description: "All services are operating normally.",
    time: "2 hrs ago",
    icon: "◉",
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // AI integration
  const [aiMessage, setAiMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const activeLabel =
    navItems.find((item) => item.id === activePage)?.label ?? "Command Center";

  const sendAIMessage = async () => {
    const message = aiMessage.trim();

    if (!message || aiLoading) {
      return;
    }

    setAiLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "AI request failed.");
      }

      setAiResponse(data.response);
      setAiMessage("");
    } catch (error) {
      console.error("AI request error:", error);

      setAiResponse(
        error instanceof Error
          ? `AI Error: ${error.message}`
          : "AI request failed.",
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="brand">
          <div className="brand-mark">A</div>

          {sidebarOpen && (
            <div className="brand-text">
              <span>ACHION</span>
              <small>COMMAND SYSTEM</small>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          {sidebarOpen && <p className="section-title">MAIN MENU</p>}

          <nav>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => setActivePage(item.id)}
                title={item.label}
              >
                <span className="nav-icon">{item.icon}</span>

                {sidebarOpen && <span>{item.label}</span>}

                {item.id === "tasks" && sidebarOpen && (
                  <span className="nav-badge">7</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          {sidebarOpen && (
            <div className="system-card">
              <div className="system-dot" />
              <div>
                <strong>All Systems</strong>
                <span>Operational</span>
              </div>
            </div>
          )}

          <button className="nav-item settings">
            <span className="nav-icon">⚙</span>
            {sidebarOpen && <span>Settings</span>}
          </button>

          <div className="user-card">
            <div className="avatar">S</div>

            {sidebarOpen && (
              <div className="user-info">
                <strong>Shahan</strong>
                <span>Frontend Owner</span>
              </div>
            )}

            {sidebarOpen && <span className="more">•••</span>}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>

            <div>
              <p className="breadcrumb">ACHION / WORKSPACE</p>
              <h1>{activeLabel}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-button" title="Search">
              ⌕
            </button>

            <button className="icon-button notification" title="Notifications">
              ◌
              <span />
            </button>

            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          <section className="hero">
            <div>
              <span className="eyebrow">
                <span className="live-dot" />
                SYSTEM ONLINE
              </span>

              <h2>
                Welcome back,
                <br />
                <span>Ayan.</span>
              </h2>

              <p>
                Your command center is ready. Monitor your projects, coordinate
                your team and keep everything moving.
              </p>
            </div>

            <div className="hero-orbit">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit-core">A</div>
            </div>
          </section>

          <section className="stats-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.title}>
                <div className="stat-top">
                  <div className="stat-icon">{stat.icon}</div>

                  <span className="stat-change">
                    {stat.positive ? "↗" : ""} {stat.change}
                  </span>
                </div>

                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <div className="panel projects-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">WORKSPACE</p>
                  <h3>Active Projects</h3>
                </div>

                <button className="text-button">View all →</button>
              </div>

              <div className="project-list">
                {projects.map((project) => (
                  <div className="project-row" key={project.name}>
                    <div className="project-symbol">◈</div>

                    <div className="project-main">
                      <div className="project-heading">
                        <div>
                          <strong>{project.name}</strong>
                          <p>{project.description}</p>
                        </div>

                        <span className={`status ${project.statusClass}`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="progress-line">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />
                        </div>

                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel activity-panel">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">LIVE FEED</p>
                  <h3>Recent Activity</h3>
                </div>

                <span className="live-label">
                  <span className="live-dot" />
                  LIVE
                </span>
              </div>

              <div className="activity-list">
                {activities.map((activity) => (
                  <div className="activity-item" key={activity.title}>
                    <div className="activity-icon">{activity.icon}</div>

                    <div className="activity-content">
                      <strong>{activity.title}</strong>
                      <p>{activity.description}</p>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="quick-panel">
              <div>
                <p className="panel-kicker">ACHION AI</p>

                <h3>Talk to ACHION</h3>

                <p>
                  {aiResponse ||
                    "Ask ACHION anything about your workspace, tasks, projects or productivity."}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <input
                  value={aiMessage}
                  onChange={(event) => setAiMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendAIMessage();
                    }
                  }}
                  placeholder="Ask ACHION..."
                  disabled={aiLoading}
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "inherit",
                    outline: "none",
                  }}
                />

                <button
                  className="primary-button"
                  onClick={sendAIMessage}
                  disabled={aiLoading || !aiMessage.trim()}
                >
                  {aiLoading ? "Thinking..." : "Ask AI"}
                </button>
              </div>
            </div>

            <div className="performance-panel">
              <div className="performance-header">
                <div>
                  <p className="panel-kicker">PERFORMANCE</p>
                  <h3>Workspace Activity</h3>
                </div>

                <span>Last 7 days</span>
              </div>

              <div className="chart">
                <div className="chart-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="chart-bars">
                  {[38, 55, 44, 68, 58, 82, 74, 94, 78, 100, 86, 92].map(
                    (height, index) => (
                      <div
                        className="chart-bar"
                        key={index}
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          <footer className="footer">
            <span>ACHION SYSTEM</span>
            <span>v1.0.0</span>
            <span>© 2026 ACHION</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
