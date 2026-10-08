from functools import lru_cache
from pathlib import Path
import joblib
from huggingface_hub import hf_hub_download

REPO_ID = "Ayush011/sustainable-facility-ai-models"

@lru_cache(maxsize=None)
def load_model(model_name: str):
    local_path = Path(__file__).resolve().parents[1] / "ml" / "models" / model_name

    if local_path.exists():
        return joblib.load(local_path)

    downloaded_path = hf_hub_download(
        repo_id=REPO_ID,
        filename=model_name,
        repo_type="model"
    )

    return joblib.load(downloaded_path)
