from flask import Blueprint, jsonify, session, request
from flask_login import current_user,
from app.models import db, User, Servers

server_routes = Blueprint("server", __name__)

@bp.route("/users/:id", methods=["GET"])
def getServers():
    '''
    get user's servers 
    '''
    if current_user_is_authenticated:
      servers = Servers.query.filter(Servers.user_id == User.id)
      return servers