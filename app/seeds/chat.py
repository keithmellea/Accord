from app.models import db, Chat
from faker import Faker
import random

faker = Faker()
# Adds a demo user, you can add other users here if you want
def seed_chat():

    gaming = Chat(content="Gaming", channel_id=1, owner_id=1)
    study = Chat(content="Study", channel_id=2, owner_id=2)

    for i in range(0, 40):
        another = Chat(content=faker.text(), channel_id=random.randint(1, 15), owner_id=random.randint(1, 20))
        db.session.add(another)

    db.session.add(gaming)
    db.session.add(study)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_chat():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()
