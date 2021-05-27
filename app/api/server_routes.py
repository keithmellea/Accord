from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Server
from app.forms import ServerForm

server_routes = Blueprint("server", __name__)

@server_routes.route("/", methods=["GET"])
def getServers():
    '''
    get user's servers
    '''
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}


# @server_routes.route('/', methods=["POST"])
# def post_channel():
#     '''
#     CREATE a server
#     '''
#     form = ServerForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         server = Server(
#             server_name=form.data['server_name'],
#             img_url=form.data['img_url']
#         )
#         db.session.add(server)
#         db.session.commit()
#         return server.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
