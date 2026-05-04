from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from .models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['PSOT'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    hashed = generate_password_hash(data['password'])
    user = User(
        email=data['email'],
        password=hashed,
        name=data['name'],
        role=data.get('role', 'member')
    )
    db.session.add(user)
    db.session.commit({'message' : 'User created'}),201

    @auth_bp.route('/login', methods=['POST'])
    def login():
        data=request.json
        user = User.query.filter_By(email=data['email']).first()
        if not user or not check_password_hash(user, password, data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        access_token = create_access_token(identify=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role
            }
        })