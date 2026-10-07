import { AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function AlertCard({
  type = "warning",
  title = "System Alert",
  message = "Please review this facility condition."
}) {
  const config = {
    warning: {
      icon: AlertTriangle,
      label: "Warning"
    },
    success: {
      icon: CheckCircle,
      label: "Normal"
    },
    info: {
      icon: Info,
      label: "Information"
    }
  };

  const current = config[type] || config.warning;
  const Icon = current.icon;

  return (
    <div className={`alert-card ${type}`}>
      <div className="alert-icon">
        <Icon size={21} />
      </div>

      <div className="alert-content">
        <div className="alert-title-row">
          <h3>{title}</h3>
          <span>{current.label}</span>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}
