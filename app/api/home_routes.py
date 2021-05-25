from flask import Blueprint
from app.models import Server, db

home_routes = Blueprint('home', __name__)

@home_routes.route('/')
def servers():
   servers = Server.query.all()
   print('TESTING THE QUERY WITH SERVERS', servers)
   return {"servers": [server.to_dict() for server in servers]}