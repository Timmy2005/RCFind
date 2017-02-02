import smtplib

from app import app
from flask import jsonify
from flask import render_template, request, redirect
from .models import RCTrack, Requests

@app.before_request
def before_request():
    if request.url.startswith('https://'):
        url = request.url.replace('https://', 'http://', 1)
        code = 301
        return redirect(url, code=code)

@app.route('/send_data', methods=['POST'])
def send_data():
    t = RCTrack.query.all()
    data = []
    for i in t:
        b = {'lat': str(i.lat), 'lng': str(i.lng), 'name': i.name, 'address': i.address, 'phone': i.phone,
             'website': i.website, 'changed': i.changed, 'tags': i.tags, 'type': i.type}
        data.append(b)
    return jsonify(data)


@app.route('/', methods=['POST', 'GET'])
def index():
    logo = '../static/pictures/logo.png'
    if request.method == 'POST':
        print(render_template('index.html',
                              title='RCFind.com',
                              logo=logo))
    return render_template('index.html',
                           title='RCFind.com',
                           logo=logo)


@app.route('/send_email', methods=['POST', 'GET'])
def send_email():
    name = request.json['name']
    address = request.json['address']
    phone = request.json['phone']
    website = request.json['website']
    notes = request.json['notes']
    lat = request.json['lat']
    lng = request.json['lng']
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("ymmit101@gmail.com", "Flavor4528")

    msg = name + '\n' + address + '\n' + phone + '\n' + website + '\n' + notes + '\n' + str(lat) + '\n' + str(lng)
    server.sendmail("ymmit101@gmail.com", "ymmit101@gmail.com", msg.encode('utf-8'))
    server.quit()

    Requests(name=name, address=address, phone=phone, website=website, notes=notes, lat=lat, lng=lng)
    return 'works!'
