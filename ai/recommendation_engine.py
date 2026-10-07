def recommendations(data):
    actions = []

    if data.get("energy", 0) > 150:
        actions.append("Optimize HVAC and equipment schedules.")

    if data.get("waste_level", 0) > 85:
        actions.append("Prioritize waste collection.")

    if data.get("aqi", 0) > 150:
        actions.append("Inspect air-quality hotspot.")

    if not actions:
        actions.append("Continue normal monitoring.")

    return actions
