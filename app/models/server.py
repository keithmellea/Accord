from .db import db
from .user_server import user_server

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.String(15), nullable=False)
    img_url = db.Column(db.Text, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    channels = db.relationship("Channel", cascade="all, delete", back_populates="server")

    users = db.relationship(
        "User",
        secondary=user_server,
        back_populates="servers"
    )

    def to_dict(self):
        return {
        "id": self.id,
        "name": self.server_name,
        "img_url": self.img_url
        }
