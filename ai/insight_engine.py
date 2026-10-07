def generate_insight(data):
    if data.get("energy", 0) > 150:
        return "Energy consumption is high. Check HVAC and equipment schedules."

    if data.get("waste_level", 0) > 85:
        return "Waste overflow risk is high. Schedule collection."

    if data.get("aqi", 0) > 150:
        return "Air quality is elevated. Inspect possible pollution sources."

    return "Facility conditions are within the expected operating range."
