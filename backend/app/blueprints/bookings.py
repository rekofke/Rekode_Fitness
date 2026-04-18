from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Booking, Client, Class
from ..schemas import BookingSchema

bookings_bp = Blueprint('bookings', __name__, url_prefix='/api/bookings')

@bookings_bp.route('/', methods=['GET'])
@jwt_required()
def get_bookings():
    """ Get all bookings (admin) or user's" own bookings """
    user_id = get_jwt_identity()
    
    