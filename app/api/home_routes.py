from flask import Blueprint, session, request
from app.models import Server, db, user_server, User
from app.forms import JoinServerForm
from flask_login import current_user
#import user from flask login
home_routes = Blueprint('home', __name__)

@home_routes.route('/')
def servers():
   servers = Server.query.all()
   # print('TESTING THE QUERY WITH SERVERS', user_server)
   return {"servers": [server.to_dict() for server in servers]}

@home_routes.route('/<server_id>', methods=['POST'])
def createUserServer(server_id): 
   '''
   joining a server
   '''
   user = User.query.get(current_user.id)
   server = Server.query.get(server_id)

   user.servers.append(server)

   db.session.add(user)
   db.session.commit()

   return {"success": "user joined the server"}
   