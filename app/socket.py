from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os
from .models import User, Chat, Channel, db
# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://accordapp.herokuapp.com',
        'https://accordapp.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)

#handle chat messages to specific rooms
# @socketio.on('chat_to_channel')
# def chat_to_channel(data):
#     message = Chat(content=data['content'], channel_id=data['channel_id'], created_at=datetime.datetime.utcnow())

#     db.session.add(message)
#     db.session.commit()

#     send(message.to_dict(), to=f'channel_{data["channel_id"]}')
