from .db import db

user_server = db.Table(
    "usersServers",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "server_id",
        db.Integer,
        db.ForeignKey("servers.id"),
        primary_key=True
    )
)
