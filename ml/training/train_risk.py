import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
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

y = (
    df["energy_kwh"].rank(pct=True) * 20 +
    df["water_liters"].rank(pct=True) * 20 +
    df["aqi"].rank(pct=True) * 20 +
    df["waste_bin_level"].rank(pct=True) * 20 +
    df["traffic_count"].rank(pct=True) * 20
)

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/risk_model.pkl")

print("Risk model trained successfully.")
