import pandas as pd

def clean_data(input_file, output_file):
    df = pd.read_csv(input_file)

    df = df.drop_duplicates()

    numeric_columns = df.select_dtypes(include="number").columns

    for col in numeric_columns:
        df[col] = df[col].fillna(df[col].median())

    df.to_csv(output_file, index=False)

if __name__ == "__main__":
    clean_data(
        "data/synthetic/facility_iot_10000.csv",
        "data/processed/facility_clean.csv"
    )
