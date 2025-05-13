from datetime import datetime

from axa_pricing_app import db


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    opportunity_number = db.Column(db.String(100), nullable=False)
    client_name = db.Column(db.String(100), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    warranty_type = db.Column(db.String(50), nullable=False)
    warranty_rate = db.Column(db.Float, nullable=False)
    work_type = db.Column(db.String(50), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "opportunity_number": self.opportunity_number,
            "client_name": self.client_name,
            "destination": self.destination,
            "warranty_type": self.warranty_type,
            "warranty_rate": self.warranty_rate,
            "work_type": self.work_type,
            "cost": self.cost,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
