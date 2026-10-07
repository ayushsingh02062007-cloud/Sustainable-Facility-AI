import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "energy_kwh",
    "water_liters",
    "aqi",
    "waste_bin_level",
    "traffic_count",
    "asset_utilization"
]

X = df[features]

model = IsolationForest(
    n_estimators=200,
    contamination=0.05,
    random_state=42
)

model.fit(X)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/anomaly_model.pkl")

print("Anomaly model trained successfully.")
