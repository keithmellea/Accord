from flask import Blueprint, session, request
from app.forms import ChannelForm
#import channels models, db

#Todo- make a form for creating a channel
#todo-make sure to set up the blueprint on the app module to query

#todo- get request for all channels
#tod0- post request for channel
#todo- delete channel based on id

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/channels')
def channels():
    '''
    render all channels
    '''
    # channels = Channel.query.all()
    # return {"channels": [channel]}
    return


@channel_routes.route('/channels', methods=["POST"])
def function():
    form = ChannelForm()
    print("request: ", request.get_json())

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print("form: ", form)

        channel = Channel(
            title=form.data['title'],
            #catergory_id
            #server_id
        )

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route('/channels/<int:id>', methods=["DELETE"])
def delete_channel(id):
    '''
    Deletes a channel
    '''
    print("Delete channel route")
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return
