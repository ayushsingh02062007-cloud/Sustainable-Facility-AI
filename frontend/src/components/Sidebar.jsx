import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/energy", label: "Energy" },
    { path: "/water", label: "Water" },
    { path: "/waste", label: "Waste" },
    { path: "/air-quality", label: "Air Quality" },
    { path: "/traffic", label: "Traffic" },
    { path: "/assets", label: "Assets" },
    { path: "/climate", label: "Climate" },
    { path: "/risk", label: "Risk" },
    { path: "/forecast", label: "AI Forecast" },
    { path: "/ai-insights", label: "AI Insights" },
    { path: "/ai-prediction", label: "AI Prediction" },
    { path: "/simulation", label: "Simulation" },
    { path: "/3d", label: "3D Facility" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        🌱 Sustainable Facility AI
      </div>

      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

