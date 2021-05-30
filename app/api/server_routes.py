from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Server, Category, Channel
from app.forms import ServerForm

server_routes = Blueprint("server", __name__)

@server_routes.route("/", methods=["GET"])
def getServers():
    '''
    get user's servers
    '''
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route('/', methods=["POST"])
def post_server():
    '''
    CREATE a server
    '''
    form = ServerForm()
    user = User.query.get(current_user.id)

    form['csrf_token'].data = request.cookies['csrf_token']
    print("WE ARE TRYING TO GET THE USER ID", user.id)
    if form.validate_on_submit():
        server = Server(
            server_name=form.data['server_name'],
            img_url=form.data['img_url'],
            owner_id=current_user.id
        )
        db.session.add(user)
        db.session.add(server)
        user.servers.append(server)
        db.session.commit()

        new_category = Category(title="General")
        db.session.add(new_category)
        db.session.commit()

        new_channel = Channel(title="room 1", category_id=new_category.id, server_id=server.id)
        db.session.add(new_channel)
        db.session.commit()

        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route('/<id>', methods=["DELETE"])
def server(id):
    '''
    Delete a server
    '''

    print("TRYING TO SEE IF I GET THE ID", id)
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return {"server": server.to_dict()}


@server_routes.route('/<id>', methods=["GET"])
def get_server(id):
    '''
    Getting current server
    '''

    server = Server.query.get(id)
    print("THE SERVER WE ARE TRYING TO GET", server)
    test = server.to_dict
    print("SERVER TO DICT METHOD", test)
    return {"server": server.to_dict()}
