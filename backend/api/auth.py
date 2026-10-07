from fastapi import APIRouter

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login")
def login(username: str, password: str):
    if username == "admin" and password == "admin123":
        return {
            "success": True,
            "role": "administrator",
            "token": "demo-token"
        }

    return {
        "success": False,
        "message": "Invalid credentials"
    }
