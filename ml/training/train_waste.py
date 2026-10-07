import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from pathlib import Path

df = pd.read_csv("data/synthetic/facility_iot_10000.csv")

features = [
    "occupancy",
    "energy_kwh",
    "water_liters",
    "temperature",
    "traffic_count"
]

X = df[features]
y = df["waste_bin_level"]

model = RandomForestRegressor(
    n_estimators=150,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

Path("ml/models").mkdir(parents=True, exist_ok=True)

joblib.dump(model, "ml/models/waste_model.pkl")

print("Waste prediction model trained successfully.")
