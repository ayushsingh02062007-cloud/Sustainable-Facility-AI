import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

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

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = joblib.load("ml/models/energy_model.pkl")

pred = model.predict(X_test)

print("Energy Model R2 Accuracy:", round(r2_score(y_test, pred) * 100, 2), "%")
