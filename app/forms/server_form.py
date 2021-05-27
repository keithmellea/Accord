from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    server_name = StringField('Server Name', [validators.Length(min=1, max=15)], validators=[DataRequired()])
    img_url = StringField("Img Url", validators=[DataRequired()])
