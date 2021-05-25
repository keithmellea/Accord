from flask import Blueprint, session, request
from app.forms import ChannelForm
from app.models import Channel, db

#Todo- make a form for creating a channel
#todo-make sure to set up the blueprint on the app module to query

#todo- get request for all channels
#tod0- post request for channel
#todo- delete channel based on id

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/')
def channels():
    '''
    GET all channels
    '''
    channels = Channel.query.all()
    return {"channels": [channel.to_dict() for channel in channels]}

@channel_routes.route('/<id>')
def channels_serverId(id):
    '''
    GET all channels based on server id
    '''
    channels = Channel.query.filter(Channel.server_id == id).all()
    return {"channels": [channel.to_dict() for channel in channels]}


@channel_routes.route('/<id>')
def channels_categoryId(id):
    '''
    GET all channels based on category id
    '''
    channels = Channel.query.filter(Channel.category_id == id).all()
    print("-----CHANNELS: ", channels)
    return {"channels": [channel.to_dict() for channel in channels]}


@channel_routes.route('/', methods=["POST"])
def post_channel():
    '''
    create a channel
    '''
    #how to get the server id and the category id?
    form = ChannelForm()
    print("request: ", request.get_json())

    form['csrf_token'].data = request.cookies['csrf_token']
    form.data['category_id'] = 1
    form.data['server_id'] = 1
     #form.data['category_id'], #form.data
    #form.data['server_id']
    if form.validate_on_submit():
        channel = Channel(
            title=form.data['title'],
            category_id=1,
            server_id=1
        )
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route('/<id>', methods=["DELETE"])
def delete_channel(id):
    '''
    Deletes a channel
    '''
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return {}

@channel_routes.route('/<id>', methods=["PUT"])
def edit_channel(id):
    '''
    Rename a channel
    '''
    form = ChannelForm()

    channel = Channel.query.get(id)
    channel.title = form.data['title']
    db.session.commit()
    return channel.to_dict()
