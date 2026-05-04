from flask_sqlalchemy import SQLAlchemy
from .extensions import db
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='member')  # 'member' or 'trainer'
    bookings = db.relationship('Booking', backref='user', lazy=True)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    trainer = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.String(10), nullable=False)  # "08:00"
    end_time = db.Column(db.String(10), nullable=False)
    capacity = db.Column(db.Integer, default=15)
    # booked_count will be calculated via relationship
    bookings = db.relationship('Booking', backref='class_obj', lazy=True)
    
    @property
    def booked_count(self):
        return len(self.bookings)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), nullable=False)
    booking_date = db.Column(db.Date, default=datetime.utcnow)


# Commented out for now will use different database structure and auth system, but keeping here for reference
# 
# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key = True)
#     email= db.Column(db.String(120), unique=True, nullable=False)
#     password_hash = db.Column(db.String(256), nullable=False)
#     role = db.Column(db.String(20), default='member' nullable=False) # 'client', 'trainer', 'admin
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # Relationships
#     client_profile = db.relationship('Client', backref='user', uselist=False)
#     trainer_profile = db.relationship('Trainer', backref='user', uselist=False)

# class Client(db.Model):
#     __tablename__ = 'clients'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     first_name = db.Column(db.String(50))
#     last_name = db.Column(db.String(50))
#     phone = db.Column(db.String(20))
#     membership_type = db.Column(db.String(20)) # 'basic', 'premium'
#     bookings = db.relationship('Booking', backref='client', lazy=True)

# class Trainer(db.Model):
#     __tablename__ - 'trainers'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     first_name = db.Column(db.String(50))
#     last_name = db.Column(db.String(50))
#     bio = db.Column(db.Text)
#     specialty = db.Column(db.String(100))
#     classes = db.relationship('Class', backref='trainer', lazy=True)

# class Class(db.Model):
#     __tablename__ = 'classes'
#     id - db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String(100), nullable = False)
#     description = db.Column(db.Text)
#     trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))
#     capacty = db.Column(db.Integer)
#     start_time = db.Column(db.DateTime)
#     end_time = db.Column(db.DateTime)
#     bookings = db.relationship('Booking', backref='class', lazy=True)

# class Booking(db.Model):
#     __tablename__ = 'bookings'
#     id = db.Column(db.Integer, primary_key=True)
#     client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
#     class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
#     booked_at = db.Column(db.DateTime, default=datetime.ucnow)
#     status = db.Column(db.String(20), default='confirmed') # 'confirmed', 'cancelled'

    