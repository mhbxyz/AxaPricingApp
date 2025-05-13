from axa_pricing_app.app import db
from datetime import datetime

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    opportunity_number = db.Column(db.String(50), nullable=False)
    client_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'opportunity_number': self.opportunity_number,
            'client_name': self.client_name,
            'created_at': self.created_at.isoformat()
        }
