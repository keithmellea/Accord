from app.models import db, Server

# Adds a demo user, you can add other users here if you want
def seed_serv():

    gaming = Server(server_name="Gaming", img_url="url")
    study = Server(server_name="Study", img_url="url")
    db.session.add(gaming)
    db.session.add(study)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_serv():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
