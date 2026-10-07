import pandas as pd

def create_features(df):
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df["hour"] = df["timestamp"].dt.hour
    df["day"] = df["timestamp"].dt.dayofweek
    df["month"] = df["timestamp"].dt.month

    return df

if __name__ == "__main__":
    df = pd.read_csv("data/synthetic/facility_iot_10000.csv")
    df = create_features(df)
    print(df.head())
