# Install required plugins by running
#     sudo pip install -r requirements.txt
#
# To run the server:
#     python server.py

from bottle import get, post, route, run, static_file, template

@route('/')
def index():
    return template('index.html')

@route('/js/<filename>')
def server_static(filename):
    return static_file(filename, root='')

@route('/templates/<filename>')
def server_static(filename):
    return static_file(filename, root='')

@get('/api/hackathons')
def get_hackathons():
    return {
    'hackathons': [{
        'name':'ArchHacks', 
        'id': 'archhacks', 
        'logoUrl': 'http://archhacks.io/static/images/archhackslogo-title.png',
        'rating': 5,
        'region': 'Midwest'
        },
        {
        'name':'HackMIT', 
        'id': 'hackmit', 
        'logoUrl': 'https://cdn-images-1.medium.com/max/500/1*hbsd11Nx25iOEIHD_RAilA.png',
        'rating': 3,
        'region': 'Northeast'  
        },
        {
        'name':'PennApps', 
        'id': 'pennapps', 
        'logoUrl': 'https://pbs.twimg.com/profile_images/586629693161484288/S17v4KVV.png',
        'rating': 4,
        'region': 'Northeast'  
        },
        {
        'name':'MHacks', 
        'id': 'mhacks', 
        'logoUrl': 'https://pbs.twimg.com/profile_images/764214120451346434/_HnQTLxQ.jpg',
        'rating': 5,
        'region': 'Midwest'  
        }
    ]}

@get('/api/hackathons/:id')
def get_hackathons(id):
    if id == 'archhacks':
        return {
        'name':'ArchHacks', 
        'id': 'archhacks', 
        'logoUrl': 'http://archhacks.io/static/images/archhackslogo-title.png',
        'rating': 5,
        'region': 'Midwest',
        'description': 'ArchHacks is a HealthTech hackathon hosted at Washington University in St. Louis.',
        'reviews': [
            {
                'rating': 5,
                'user': 'Stephanie Mertz',
                'comment': 'I had the best time at ArchHacks and learned so much!'
            },
            {
                'rating': 5,
                'user': 'Allen Osgood',
                'comment': 'ArchHacks is definitely the best hackathon.'
            }
        ]
        }
    elif id == 'hackmit':
        return {
        'name':'HackMIT', 
        'id': 'hackmit', 
        'logoUrl': 'https://cdn-images-1.medium.com/max/500/1*hbsd11Nx25iOEIHD_RAilA.png',
        'rating': 3,
        'region': 'Northeast'  
        }

    elif id == 'pennapps':
        return {
        'name':'PennApps', 
        'id': 'pennapps', 
        'logoUrl': 'https://pbs.twimg.com/profile_images/586629693161484288/S17v4KVV.png',
        'rating': 4,
        'region': 'Northeast'  
        }
    else:
        return {
        'name':'MHacks', 
        'id': 'mhacks', 
        'logoUrl': 'https://pbs.twimg.com/profile_images/764214120451346434/_HnQTLxQ.jpg',
        'rating': 5,
        'region': 'Midwest'  
        }



run(host='localhost', port=8080)
