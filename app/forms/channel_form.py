from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
#import channels model (just checking if user exitst)

class ChannelForm(FlaskForm):
    title = StringField('Channel Name', validators=[DataRequired()])

