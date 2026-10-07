from pydantic import BaseModel

class SensorReading(BaseModel):
    timestamp: str
    building: str
    energy: float
    water: float
    aqi: float
    temperature: float
    humidity: float
    occupancy: int
    waste_level: float
