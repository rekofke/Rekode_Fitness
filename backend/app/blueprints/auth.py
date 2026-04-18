from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import db, User
from ..schemas import UserSchema

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods = ['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 409
    hashed_pw = generate_password_hash(data['password'])
    user = User(email=data['email'], password_hash=hashed_pw, role=data.get('role', 'client'))
    db.session.add(user)
    db.session.commit()
    return jsonify(UserSchema().dump(user)), 201

@auth_bp.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token), 200
    return jsonify({'message' : 'Invalid credentials'}), 401



