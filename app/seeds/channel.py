from app.models import db, Channel

# Adds a demo user, you can add other users here if you want
def seed_channel():

    gaming = Channel(title="Gaming", category_id=1, server_id=1)
    study = Channel(title="Study", category_id=2, server_id=2)

    db.session.add(gaming)
    db.session.add(study)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_channel():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
