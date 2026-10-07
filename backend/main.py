from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.dashboard import router as dashboard_router
from backend.api.water import router as water_router
from backend.api.waste import router as waste_router
from backend.api.air_quality import router as air_quality_router
from backend.api.traffic import router as traffic_router
from backend.api.assets import router as assets_router
from backend.api.risk import router as risk_router
from backend.api.recommendations import router as recommendations_router
from backend.api.simulation import router as simulation_router
from backend.api.energy import router as energy_router
from backend.api.forecasting import router as forecasting_router
from backend.api.facility_3d import router as facility_3d_router
from backend.api.climate import router as climate_router
from backend.api.anomalies import router as anomalies_router

app = FastAPI(
    title="Sustainable Facility AI",
    description="AI-powered Sustainable Facility and Estate Intelligence Dashboard",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Sustainable Facility AI Backend",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


app.include_router(dashboard_router)
app.include_router(water_router)
app.include_router(waste_router)
app.include_router(air_quality_router)
app.include_router(traffic_router)
app.include_router(assets_router)
app.include_router(risk_router)
app.include_router(recommendations_router)
app.include_router(simulation_router)
app.include_router(energy_router)
app.include_router(forecasting_router)
app.include_router(facility_3d_router)
app.include_router(climate_router)
app.include_router(anomalies_router)



