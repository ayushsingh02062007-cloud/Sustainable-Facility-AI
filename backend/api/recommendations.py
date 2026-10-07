from fastapi import APIRouter

router = APIRouter(
    prefix="/api/recommendations",
    tags=["AI Recommendations"]
)


@router.get("")
def get_recommendations():
    return {
        "status": "Active",
        "ai_engine": "Operational",
        "recommendations": [
            {
                "id": 1,
                "module": "Energy",
                "priority": "High",
                "problem": "Energy consumption is above the optimal operating range.",
                "reason": "Higher HVAC and equipment load detected.",
                "action": "Optimize HVAC schedules and monitor high-consumption zones.",
                "impact": "Potential reduction in energy consumption."
            },
            {
                "id": 2,
                "module": "Water",
                "priority": "Medium",
                "problem": "Water usage requires continuous monitoring.",
                "reason": "Current consumption indicates moderate operational demand.",
                "action": "Check high-usage areas and inspect water systems regularly.",
                "impact": "Improved water efficiency."
            },
            {
                "id": 3,
                "module": "Traffic",
                "priority": "Medium",
                "problem": "Traffic concentration detected near the Main Gate.",
                "reason": "Vehicle activity is higher around the primary entry point.",
                "action": "Monitor peak-hour traffic and optimize entry/exit flow.",
                "impact": "Reduced congestion and improved mobility."
            },
            {
                "id": 4,
                "module": "Assets",
                "priority": "High",
                "problem": "Some facility assets require maintenance attention.",
                "reason": "Maintenance and critical assets are present in the inventory.",
                "action": "Prioritize inspection of low-health and critical assets.",
                "impact": "Improved asset reliability."
            }
        ]
    }
