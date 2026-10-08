import { ShieldCheck, Leaf, Lock, User } from "lucide-react";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <Leaf size={28} />
          </div>
          <div>
            <h1>Sustainable Facility AI</h1>
            <p>Intelligent Facility Management Platform</p>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>
          <p>Sign in to access your facility intelligence dashboard.</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Username
            <div className="login-input">
              <User size={18} />
              <input type="text" placeholder="Enter username" />
            </div>
          </label>

          <label>
            Password
            <div className="login-input">
              <Lock size={18} />
              <input type="password" placeholder="Enter password" />
            </div>
          </label>

          <button type="submit" className="login-button">
            <ShieldCheck size={18} />
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span className="status-dot"></span>
          Secure AI Facility Environment
        </div>
      </div>
    </div>
  );
}



