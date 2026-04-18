from .extensions import ma
from .models import User, Client, Trainer, Class, Booking

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash')
class ClientSchena(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Client
        load_instance = True

class TrainerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Trainer
        load_instance = True
class ClassSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Class
        load_instance = True

class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
        load_instance = True

    