from flask import Blueprint

current_server_route = Blueprint("current_server", __name__)

@current_server_route.route('/<id>', methods=["GET"])
def current(id):
   '''
   Getting the current server
   '''
   server = Server.query.get(id)
   print("THE SERVER WE ARE TRYING TO GET", server)
   return {"server": server.to_dict()}