from flask_wtf import FlaskForm
from wtforms import IntegerField
# from wtforms.validators import DataRequired, Email, ValidationError


class JoinServerForm(FlaskForm):
    user_id = IntegerField('user_id')
    server_id = IntegerField('server_id')