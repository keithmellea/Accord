from flask import Blueprint, session, request
from flask_login import current_user
from app.models import db, User, Server

user_server_routes = Blueprint("userserver", __name__)

@user_server_routes.route("/user/<id>", methods=["GET"])
def getServersByUser(id):
    '''
    GET all servers from a specific user
    '''
    user = User.query.get(id)
    user_servers = user.servers
    return {"user_server": [userserver.to_dict() for userserver in user_servers]}


@user_server_routes.route("/server/<id>", methods=["GET"])
def getUsersByServer(id):
    '''
    GET all users in a specific server
    '''
    server = Server.query.get(id)
    servers_users = server.users
    return {"user_server": [serveruser.to_dict() for serveruser in servers_users]}
