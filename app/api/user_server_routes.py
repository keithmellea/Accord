from flask import Blueprint, session, request
from flask_login import current_user
from app.models import db, User, Server

user_server_routes = Blueprint("userserver", __name__)

@user_server_routes.route("/", methods=["GET"])
def getUserServers():
    '''
    GET all users in a server
    '''
    #user.servers
    user = User.query.get(23)
    server_user = user.servers[0]
    print("--USER--: ", user)
    print("-------user_server----: ", server_user)
    # servers = Server.query.all()
    # return {"servers": [server.to_dict() for server in servers]}
    return {"test": "value"}
