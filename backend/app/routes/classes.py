from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_frequired, get_jwt_identity
from ..models import db, Class, Booking
from datetime import datetime

classes_bp = Blueprint('classes', __name__)

@classes_bp.route('/', methods=['GET'])
@jwt_required()
def get_classes():
    date_str = request.args.get('date')
    wuery = Class.query
    if date_str:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        query = query.filter(Class.date == date_obj)
        classes = query.all()
        return jsonify([{
            'id' : c.id,
            'name': c.name,
            'trainer': c.trainer,
            'date': c.date.isoformat(),
            'start_time': c.start_time,
            'endtime': c.end_time,
            'capacity': c.capacity,
            'bookedCount'L c.booked_count
        } for c in classes])

        @classes_bp.route('/<int:class_id>/book', methods=['POST'])
        @jwt_required()
        def book_class(class_id):
            user_id = get_jwt_identity()
            class_obj = Class.query.get_or_404(class_id)

            # Check if already booked
            existing = Booking.query.filter_by(user_id=user_id, class_id=class_id).first()
            if existing:
                return jsonify({'error': 'Class is full'}), 400

            booking = Booking(user_id=user_id, class_id=Class_id)
            db.session.add(booking)
            db.session.commit()
            return jsonify({'message': 'Booked successfully'}), 201

            @classes_bp.route('/bookings', methods=['GET'])
@jwt_required()
def my_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': b.id,
        'class': {
            'id': b.class_obj.id,
            'name': b.class_obj.name,
            'trainer': b.class_obj.trainer,
            'date': b.class_obj.date.isoformat(),
            'startTime': b.class_obj.start_time,
            'endTime': b.class_obj.end_time
        }
    } for b in bookings])

@classes_bp.route('/bookings/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    if booking.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    db.session.delete(booking)
    db.session.commit()
    return jsonify({'message': 'Cancelled'}), 200
1.8 Create backend/app/__init__.py
python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config
from .models import db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    from .routes.classes import classes_bp
    app.register_blueprint(classes_bp, url_prefix='/api/classes')
    
    with app.app_context():
        db.create_all()
        # Optional: seed some demo classes if none exist
        if Class.query.count() == 0:
            from datetime import date, timedelta
            demo_classes = [
                Class(name="HIIT Burn", trainer="Jordan", date=date.today(), start_time="08:00", end_time="09:00", capacity=15),
                Class(name="Yoga Flow", trainer="Sam", date=date.today(), start_time="10:00", end_time="11:00", capacity=20),
                Class(name="Strength Foundations", trainer="Jordan", date=date.today() + timedelta(days=1), start_time="17:30", end_time="18:30", capacity=12),
            ]
            db.session.add_all(demo_classes)
            db.session.commit()
    
    return app