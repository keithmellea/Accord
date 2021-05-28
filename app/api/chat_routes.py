from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Chat, Channel, db
from app.forms import ChatForm

chat_routes = Blueprint("chat", __name__)

# @chat_routes.route("/")
# def allChats():
#     #Grabs all the chat messages. Probably will delete later.
#     chats = Chat.query.all()
#     return {"chats": [chat.to_dict() for chat in chats]}


#Grabs all the chat messages from specific channel
@chat_routes.route("/<int:id>")
def chat_channel(id):
    chats = Chat.query.filter(Chat.channel_id == id).all()
    return {"chats": [chat.to_dict() for chat in chats]}


@chat_routes.route("/<int:id>", methods=['POST'])
#For now, any user can post to the whole chat as a whole
def chatPost(id):
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.data['channel_id'] = id

    if form.validate_on_submit():
        chat = Chat(
            content = form.data['content'],
            channel_id = id
        )
        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return
