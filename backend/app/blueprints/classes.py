from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Class, User, Trainer
from ..schemas import ClassSchema

classes_bp = Blueprint('classes', __name__, url_prefix='/api/classes')

@classes_bp.route('/', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return ClassSchema(many=True).jsonify(classes)

@classes_bp.route('/', methods=['POST'])
@jwt_required()
def create_class():
    # Only trainers or admins can create classes
    user_id = get_jwt_identity()
    trainer = Trainer.query.filter_by(user_id=user_id).first()
    if not trainer:
        return jsonify({'msg': 'Only trainers can create classes'}), 403
        data = request.get_json()
        new_class = Class(name=data['name'], description=data.get('description'), 
                          trainer_id = trainer.id, capacity=data.get('capacity', 10),
                          start_time=data['start_time'], end_tirm=data['end_time'])
        db.session.add(new_class)
        db.session.commit()
        return (ClassSchema().jsonify(new_class), 201)
    


