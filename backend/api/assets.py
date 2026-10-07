from fastapi import APIRouter

router = APIRouter(prefix="/api/assets", tags=["Assets"])


@router.get("")
def get_assets():
    return {
        "total_assets": 128,
        "active_assets": 119,
        "maintenance_required": 6,
        "critical_assets": 3,
        "asset_health": 93,
        "assets": [
            {
                "id": "AST-001",
                "name": "HVAC Unit - Block A",
                "category": "HVAC",
                "status": "Active",
                "health": 96
            },
            {
                "id": "AST-002",
                "name": "Solar Panel System",
                "category": "Energy",
                "status": "Active",
                "health": 98
            },
            {
                "id": "AST-003",
                "name": "Water Pump - Block B",
                "category": "Water",
                "status": "Maintenance",
                "health": 61
            },
            {
                "id": "AST-004",
                "name": "DG Generator",
                "category": "Power",
                "status": "Active",
                "health": 89
            }
        ]
    }
