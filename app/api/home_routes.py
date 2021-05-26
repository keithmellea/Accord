from flask import Blueprint, session
from app.models import Server, db, user_server

home_routes = Blueprint('home', __name__)

@home_routes.route('/')
def servers():
   servers = Server.query.all()
   # print('TESTING THE QUERY WITH SERVERS', user_server)
   return {"servers": [server.to_dict() for server in servers]}

# @home_route.route('/', methods=['POST'])
# def createUserServer(userId, serverId):
