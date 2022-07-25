from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, url

class imageFrom(FlaskForm):
  imageURL = URLField("imageURL", validators=[ url(),DataRequired()])
