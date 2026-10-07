import pandas as pd

def validate(file):
    df = pd.read_csv(file)

    print("Rows:", len(df))
    print("Columns:", len(df.columns))
    print("Missing values:")
    print(df.isnull().sum())
    print("\nDataset validation completed.")

if __name__ == "__main__":
    validate("data/synthetic/facility_iot_10000.csv")
