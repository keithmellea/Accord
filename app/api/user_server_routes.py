from flask import Blueprint, session, request
from flask_login import current_user
from app.models import db, User, Server

user_server_routes = Blueprint("userserver", __name__)

@user_server_routes.route("/", methods=["GET"])
def getServersByUser():
    '''
    GET all servers from a specific user
    '''
    id = current_user.get_id()
    if id:
        user = User.query.get(current_user.get_id())
        user_servers = user.servers
        return {"user_server": [userserver.to_dict() for userserver in user_servers]}
    else:
        return {}
        

@user_server_routes.route("/server/<id>", methods=["GET"])
def getUsersByServer(id):
    '''
    GET all users in a specific server
    '''
    server = Server.query.get(id)
    servers_users = server.users
    return {"user_server": [serveruser.to_dict() for serveruser in servers_users]}
