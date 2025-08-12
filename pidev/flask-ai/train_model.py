# train_model.py

class CarbonEstimator:
    EMISSION_FACTORS = {
        'car': 120,       # gCO2/km
        'bus': 68,
        'train': 35,
        'plane': 255,
        'bike': 0,
        'walk': 0
    }

    def __init__(self, transport_type: str, distance_km: float):
        self.transport_type = transport_type.lower()
        self.distance_km = distance_km

    def estimate_emission(self):
        factor = self.EMISSION_FACTORS.get(self.transport_type, 100)
        return round(factor * self.distance_km, 2)

    def get_summary(self):
        emission = self.estimate_emission()
        return {
            "transport_type": self.transport_type,
            "distance_km": self.distance_km,
            "co2_emission_g": emission,
            "co2_emission_kg": round(emission / 1000, 2)
        }
