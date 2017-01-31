from app import db


class RCTrack(db.Model):
    __tablename__ = 'RCTrack'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    lat = db.Column(db.DECIMAL)
    lng = db.Column(db.DECIMAL)
    phone = db.Column(db.String)
    type = db.Column(db.String)
    address = db.Column(db.String)
    website = db.Column(db.String)
    tags = db.Column(db.String)
    changed = db.Column(db.String)
    notes = db.Column(db.String)

    def __repr__(self):
        return '<Track %r>' % self.name


class Requests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    lat = db.Column(db.DECIMAL)
    lng = db.Column(db.DECIMAL)
    phone = db.Column(db.String)
    address = db.Column(db.String)
    website = db.Column(db.String)
    notes = db.Column(db.String)
