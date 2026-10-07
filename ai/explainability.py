def explain_prediction(model_name, prediction):
    return {
        "model": model_name,
        "prediction": prediction,
        "explanation": "Prediction is based on facility operational and environmental features."
    }
