from fastapi import APIRouter

router = APIRouter(prefix="/api/traffic", tags=["Traffic"])


@router.get("")
def get_traffic():
    return {
        "traffic_level": "Moderate",
        "vehicle_count": 124,
        "average_speed": 28.5,
        "parking_occupancy": 72,
        "hotspot": "Main Gate",
        "status": "Normal",
        "monitoring": "Active",
        "anomaly_detection": "Active",
        "forecasting": "Active"
    }
