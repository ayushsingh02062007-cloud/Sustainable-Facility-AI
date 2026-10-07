from fastapi import APIRouter

router = APIRouter(prefix="/api/3d", tags=["3D Facility"])


@router.get("")
def get_facility_3d():
    return {
        "status": "Active",
        "facility": "Sustainable Smart Campus",
        "buildings": 5,
        "floors": 18,
        "zones": 12,
        "iot_devices": 248,
        "monitored_assets": 128,
        "sustainability_score": 82
    }
