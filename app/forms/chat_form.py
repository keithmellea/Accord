from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# def user_exists(form, field):
#     print("Checking if user exits", field.data)
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError("User is already registered.")


class ChatForm(FlaskForm):
    content = StringField('Message', validators=[DataRequired()])
