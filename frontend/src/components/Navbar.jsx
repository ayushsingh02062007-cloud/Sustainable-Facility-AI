import { Activity, Bell, Cpu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="top-navbar">
      <div>
        <h2>Facility Intelligence Center</h2>
        <span>AI-powered sustainable operations</span>
      </div>

      <div className="navbar-status">
        <div className="navbar-live">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>

        <div className="navbar-icon">
          <Activity size={18} />
        </div>

        <div className="navbar-icon">
          <Bell size={18} />
        </div>

        <div className="navbar-ai">
          <Cpu size={17} />
          AI ENGINE
        </div>
      </div>
    </header>
  );
}
