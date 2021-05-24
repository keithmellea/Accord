from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Server

server_routes = Blueprint("server", __name__)

@server_routes.route("/", methods=["GET"])
def getServers():
    '''
    get user's servers 
    '''
    if current_user_is_authenticated:
      servers = Server.query.all()
      return servers