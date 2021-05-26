from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Server

server_routes = Blueprint("server", __name__)

@server_routes.route("/", methods=["GET"])
def getServers():
    '''
    get user's servers
    '''
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}

# @server_routes("/server/:id")
# def server_page():
#     server = Server.query
