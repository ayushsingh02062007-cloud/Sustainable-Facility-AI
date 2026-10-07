import pandas as pd

def load_data(path):
    df = pd.read_csv(path)
    return df.drop_duplicates()

if __name__ == "__main__":
    df = load_data("data/synthetic/facility_iot_10000.csv")
    print(df.head())
