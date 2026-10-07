import { LoaderCircle } from "lucide-react";

export default function Loading({
  message = "Loading facility intelligence..."
}) {
  return (
    <div className="loading-panel component-loading">
      <div className="loading-spinner">
        <LoaderCircle size={28} />
      </div>

      <h2>{message}</h2>
      <p>Please wait while the latest facility data is being loaded.</p>
    </div>
  );
}
