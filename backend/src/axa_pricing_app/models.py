from datetime import datetime

from axa_pricing_app import db


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    opportunity_number = db.Column(db.String(100), nullable=False)
    client_name = db.Column(db.String(100), nullable=False)

    property_type = db.Column(db.String(100))         # Type de bien
    warranty_type = db.Column(db.String(100))         # DO seule, DO + TRC, etc.
    destination = db.Column(db.String(255))           # Destination de l'ouvrage
    work_type = db.Column(db.String(100))             # Neuf, rénovation, etc.

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "opportunity_number": self.opportunity_number,
            "client_name": self.client_name,
            "property_type": self.property_type,
            "warranty_type": self.warranty_type,
            "destination": self.destination,
            "work_type": self.work_type,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
