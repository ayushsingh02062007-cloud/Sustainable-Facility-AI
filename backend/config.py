import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./facility.db"
)

APP_NAME = "Sustainable Facility AI"
DEBUG = os.getenv("DEBUG", "True").lower() == "true"
