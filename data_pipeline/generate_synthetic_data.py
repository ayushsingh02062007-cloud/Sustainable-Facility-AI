import numpy as np
import pandas as pd
from pathlib import Path

np.random.seed(42)

N = 10000

timestamps = pd.date_range(
    start="2026-01-01",
    periods=N,
    freq="h"
)

buildings = [
    "Admin Block",
    "Engineering Block",
    "Computer Science Block",
    "Library",
    "Hostel A",
    "Hostel B",
    "Laboratory",
    "Auditorium"
]

df = pd.DataFrame({
    "timestamp": timestamps,
    "building": np.random.choice(buildings, N),
    "temperature": np.random.normal(28, 4, N).round(2),
    "humidity": np.random.normal(60, 10, N).clip(20, 95).round(2),
    "occupancy": np.random.randint(20, 500, N),
    "energy_kwh": np.random.normal(120, 35, N).clip(20, 300).round(2),
    "water_liters": np.random.normal(850, 250, N).clip(100, 2000).round(2),
    "aqi": np.random.normal(80, 25, N).clip(20, 300).round(2),
    "waste_bin_level": np.random.uniform(10, 100, N).round(2),
    "traffic_count": np.random.randint(5, 250, N),
    "asset_utilization": np.random.uniform(30, 100, N).round(2)
})

df["anomaly"] = 0

anomaly_idx = np.random.choice(
    df.index,
    size=int(N * 0.05),
    replace=False
)

df.loc[anomaly_idx, "anomaly"] = 1
df.loc[anomaly_idx, "energy_kwh"] *= np.random.uniform(1.5, 2.5, len(anomaly_idx))
df.loc[anomaly_idx, "water_liters"] *= np.random.uniform(1.4, 2.2, len(anomaly_idx))
df.loc[anomaly_idx, "aqi"] *= np.random.uniform(1.4, 2.0, len(anomaly_idx))

output = Path("data/synthetic")
output.mkdir(parents=True, exist_ok=True)

file = output / "facility_iot_10000.csv"
df.to_csv(file, index=False)

print(f"Dataset created: {file}")
print(f"Rows: {len(df)}")
print(f"Anomalies: {df.anomaly.sum()}")
