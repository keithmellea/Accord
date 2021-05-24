from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .server import seed_serv, undo_serv
from .channel import seed_channel, undo_channel
from .chat import seed_chat, undo_chat
from .user_server import seed_useserv, undo_useserv
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_serv()
    seed_channel()
    seed_chat()
    seed_useserv()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_serv()
    undo_channel()
    undo_chat()
    undo_useserv()
    # Add other undo functions here
