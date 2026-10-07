import random
import time

def generate_sensor_reading():
    return {
        "energy": round(random.uniform(80, 180), 2),
        "water": round(random.uniform(500, 1200), 2),
        "aqi": round(random.uniform(40, 150), 2),
        "occupancy": random.randint(20, 500),
        "waste_level": round(random.uniform(10, 100), 2)
    }

if __name__ == "__main__":
    while True:
        print(generate_sensor_reading())
        time.sleep(2)
