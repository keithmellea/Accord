from app.models import db, Channel
from faker import Faker
import random

faker = Faker()
# Adds a demo user, you can add other users here if you want
def seed_channel():

    gaming = Channel(title="Gaming", category_id=1, server_id=1)
    study = Channel(title="Study", category_id=2, server_id=2)
    for i in range(0, 23):
        another = Channel(title=faker.word(), category_id=random.randint(1, 10), server_id=random.randint(1,9))
        db.session.add(another)
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
