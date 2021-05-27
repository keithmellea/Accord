from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    server_name = StringField('Server Name', validators=[DataRequired()])
    img_url = TextField("Img Url", validators=[DataRequired()])
