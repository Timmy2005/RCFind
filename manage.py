from app.models import RCTrack
from app import db


def new():
    lat = input('LAT:   ')
    lng = input('LNG:   ')
    name = input('Name:   ')
    address = input('Address:   ')
    phone = input('Phone:   ')
    website = input('Website:   ')
    tags = input('Tags: ')
    changed = input('Last Changed:   ')
    rctype = input('Type:   ')
    notes = input('Notes(optional):   ')

    if rctype == 'shop' or rctype == 'track' or rctype == 'both':
        print('')
        print('')
        print('Info:')
        print('')
        print('LAT: ' + str(lat))
        print('LNG: ' + str(lng))
        print('Name: ' + str(name))
        print('Address: ' + str(address))
        print('Phone: ' + str(phone))
        print('Website: ' + str(website))
        print('Tags: ' + str(tags))
        print('Last Changed: ' + str(changed))
        print('Type: ' + rctype)
        print('Notes:  ' + notes)
        print('')
        print('')
        check = input('Are you sure you want to do this?(y/n)  ')
        if check == 'y':
            t = RCTrack(lng=lng, lat=lat, name=name, address=address, phone=phone, tags=tags, changed=changed,
                        type=rctype, notes=notes, website=website)
            db.session.add(t)
            db.session.commit()
            print('Your data is live!')
        else:
            print('This data has not been stored in the database.')

    else:
        print('Type not valid.')


a = input('Action:   ')
if a == 'new':
    print('Running new.')
    print('')
    new()
