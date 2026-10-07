import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "temperature",
    "humidity",
    "occupancy",
    "water_liters",
    "aqi",
    "traffic_count"
]

X = df[features]
y = df["energy_kwh"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/energy_model.pkl")

print("Energy forecasting model trained successfully.")
