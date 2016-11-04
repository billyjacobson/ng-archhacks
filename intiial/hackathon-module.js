// Declaration of the application and its requirements.
var hackathon = angular.module('hackathon', []);

/*
 * Creates an HTML element that we can use like this:
 *     <hackathon-list></hackathon-list>
 * 
 * This element fetches the hackathons from the server, displays them
 * and allows the user to navigate to the details page for specific hackathons.
 */
hackathon.component('hackathonList', {
    templateUrl: 'templates/hackathon-list.htm',
    controller: function HackathonListController($http, $location) {
        this.hackathonList = [];

        $http({
            method: 'GET',
            url: '/api/hackathons'
        }).then(response => this.hackathonList = response.data.hackathons)
            .catch(err => console.log('there was an error!', err));

        this.viewHackathonDetails = function(hackathon) {
            $location.url(`/${hackathon.id}`);
        }
    }
});