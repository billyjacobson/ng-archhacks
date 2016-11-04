var hackathon = angular.module('hackathon', []);

hackathon.component('hackathonList', {
    templateUrl: 'templates/hackathon-list.htm',
    controller: function HackathonListController($location) {
        this.hackathonList = [{
        'name':'ArchHacks', 
        'id': 'archhacks', 
        'logoUrl': 'http://archhacks.io/static/images/archhackslogo-title.png',
        'rating': 5,
        'region': 'Midwest'
        }];

        this.viewHackathonDetails = function(hackathon) {
            $location.url(`/${hackathon.id}`);
        }
    }
});