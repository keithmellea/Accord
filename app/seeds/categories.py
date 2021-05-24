from app.models import db, Category
from faker import Faker

faker = Faker()
# Adds a demo user, you can add other users here if you want
def seed_categories():

    gaming = Category(title='Gaming')
    study = Category(title='Study')
    for i in range(0, 20):
        another = Category(title=faker.word())
        db.session.add(another)
    db.session.add(gaming)
    db.session.add(study)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
