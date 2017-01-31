from app import db
from app.models import RCTrack

print('Select table you want to delete from')
a = input('>>>  ')

poss_for_track = ['track', 'Track', 'TRACK', 'rctrack', 'rc track', 'RCtrack', 'RC track', 'RC Track', 'RCTrack',
                  'Tracks', 'tracks']

for i in poss_for_track:
    if a == i:
        for x in RCTrack.query.all():
            db.session.delete(x)
        print('Table ' + a + ' deleted.')
