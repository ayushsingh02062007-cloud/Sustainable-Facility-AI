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
    "aqi"
]

X = df[features]
y = df["water_liters"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/water_model.pkl")

print("Water prediction model trained successfully.")
