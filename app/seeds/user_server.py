from app.models import db, User, Server
from faker import Faker

faker = Faker()
# Adds a demo user, you can add other users here if you want
def seed_useserv():

    userone = User(username='Demo2', email='demo2@aa.io', password='password')
    usertwo = User(username='Demo3', email='demo3@aa.io', password='password')
    userthree = User(username='Demo4', email='demo4@aa.io', password='password')
    userfour = User(username='Demo5', email='demo5@aa.io', password='password')

    usertree = User.query.get(2)
    serverone = Server(server_name="Test", img_url=faker.image_url())

    usertree.servers.append(serverone)

    userone.servers.append(serverone)
    # serverone.users.append(userone)

    usertwo.servers.append(serverone)
    userthree.servers.append(serverone)
    userfour.servers.append(serverone)
    # serverone.users.append(usertwo)


    db.session.add(userone)
    # db.session.add(usertwo)
    # db.session.add(serverone)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_useserv():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
