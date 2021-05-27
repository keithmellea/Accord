from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import db, User, Server, Category

category_routes = Blueprint('category', __name__)

@category_routes.route('/')
def categories():
    '''
    GET all categories
    '''
    categories = Category.query.all()
    return {"categories": [category.to_dict() for category in categories]}
