import { Brain, ArrowRight } from "lucide-react";

export default function AIInsight({
  title = "AI Insight",
  description = "AI has identified an operational improvement opportunity.",
  action = "Review recommendation",
  impact = ""
}) {
  return (
    <div className="ai-insight-card">
      <div className="ai-insight-icon">
        <Brain size={21} />
      </div>

      <div className="ai-insight-content">
        <div className="ai-insight-title-row">
          <h3>{title}</h3>
          <span>AI</span>
        </div>

        <p>{description}</p>

        {action && (
          <div className="ai-insight-action">
            <strong>{action}</strong>
            <ArrowRight size={16} />
          </div>
        )}

        {impact && (
          <div className="ai-insight-impact">
            Expected impact: {impact}
          </div>
        )}
      </div>
    </div>
  );
}
