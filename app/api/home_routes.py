from flask import Blueprint, session, request
from app.models import Server, db, user_server, User
from app.forms import JoinServerForm
#import user from flask login
home_routes = Blueprint('home', __name__)

@home_routes.route('/')
def servers():
   servers = Server.query.all()
   # print('TESTING THE QUERY WITH SERVERS', user_server)
   return {"servers": [server.to_dict() for server in servers]}

@home_routes.route('/<server_id>', methods=['POST'])
def createUserServer(server_id): 
   # form = JoinServerForm()
   # data = form.data
   print("TESTING TO SEE FORM DATA", server_id)
   return "hi"
   