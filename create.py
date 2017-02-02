import csv
from app import db
from app import models
import json

f = open('RC Finder Data Set.csv', 'rt')
try:
    reader = csv.reader(f)
    next(reader)
    data = {}
    a = 0
    for row in reader:
        a += 1
        data[str(a)] = row
    db.drop_all()
    db.create_all()
    for line in data.values():
        values = []
        for value in line:
            values.append(value)
        t = models.RCTrack(name=values[0], address=values[1] + ', ' + values[2] + ', ' + values[3] + ', ' + values[4],
                           lat=values[5], lng=values[6], phone=values[7], website=values[8], tags=values[9],
                           changed=values[10], notes=values[11])
        db.session.add(t)
        db.session.commit()
finally:
    f.close()
