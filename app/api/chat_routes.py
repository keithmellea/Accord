from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Chat, Channel, db
from app.forms import ChatForm

chat_routes = Blueprint("chat", __name__)

@chat_routes.route("/")
def allChats():
    #Grabs all the chat messages. Probably will delete later.
    chats = Chat.query.all()
    return {"chats": [chat.to_dict() for chat in chats]}


#Grabs all the chat messages from specific user
@chat_routes.route("/<int:id>")
def chat(id):
    chat = Chat.query.get(id)
    print("this is the chat", chat)
    return chat.to_dict()


@chat_routes.route("/", methods=['POST'])
#For now, any user can post to the whole chat as a whole
def chatPost():
    form = ChatForm()
    if form.validate_on_submit():
        chat = Chat(
            content = form.data['content'],
            channel_id = 1
        )
        db.session.add(chat)
        db.session.commit()
        return chat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
