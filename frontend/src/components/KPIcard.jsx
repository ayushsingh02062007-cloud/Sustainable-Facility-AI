export default function KPIcard({
  title = "KPI",
  value = "—",
  subtitle = "",
  icon = null,
  trend = "",
  status = ""
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">
        {icon}
      </div>

      <div className="kpi-content">
        <p>{title}</p>
        <h2>{value}</h2>

        {subtitle && <span>{subtitle}</span>}

        {(trend || status) && (
          <div className="kpi-meta">
            {trend && <strong>{trend}</strong>}
            {status && <small>{status}</small>}
          </div>
        )}
      </div>
    </div>
  );
}
