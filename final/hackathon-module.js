// Declaration of the application and its requirements.
var hackathon = angular.module('hackathon', ['ngRoute']);

// Set up the different routes.
hackathon.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $routeProvider.
        when('/', {
            template: '<hackathon-list></hackathon-list>',
        }).
        when('/:hackathonId', {
            template: '<hackathon-details></hackathon-details>',
        }).
        otherwise('/');
    }
]);

/*
 * Creates an HTML element that we can use like this:
 *     <hackathon-list></hackathon-list>
 * 
 * This element fetches the hackathons from the server, displays them
 * and allows the user to navigate to the details page for specific hackathons.
 */
hackathon.component('hackathonList', {
    templateUrl: 'templates/hackathon-list.htm',
    /*
     * Controller for the hackathon list.
     *
     * $http - Angular's built in HTTP handling service. Executes HTTP calls 
     *     that return promises.
     * $location - Angular's built in location service. Helps navigate between 
     *     pages.
     * hackathonApi - Our custom API service that we can use to make our API 
     *     calls in a more readable way.
     */
    controller: function HackathonListController($http, $location, hackathonApi) {
        this.hackathonList = [];

        // Load the hackathons from the server using our service.
        hackathonApi.listHackathons()
            /* On the successfull loading of hackathons, set the controller's
             * hackathon list.
             * 
             * I am using ES6 arrow notation here, but this is equivalent to
             * .then(function(response) {
             *     this.hackathonList = response.data.hackathons;
             * })
             */
            .then(response => this.hackathonList = response.data.hackathons)
            // On failure to load the hackathons, log an error.
            .catch(err => console.log('there was an error!', err));

        this.viewHackathonDetails = function(hackathon) {
            $location.url(`/${hackathon.id}`);
        }
    }
});

/*
 * Creates an HTML element that we can use like this:
 *     <hackathon-list></hackathon-list>
 * 
 * This element fetches the hackathons from the server, displays them
 * and allows the user to navigate to the details page for specific hackathons.
 */
hackathon.component('hackathonDetails', {
    templateUrl: 'templates/hackathon-details.htm',
    /*
     * Controller for the hackathon details.
     *
     * $http - Angular's built in HTTP handling service. Executes HTTP calls 
     *     that return promises.
     * $location - Angular's built in location service. Helps navigate between 
     *     pages.
     * $routeParams - Angular's built in service to get route parameters.
     * hackathonApi - Our custom API service that we can use to make our API 
     *     calls in a more readable way.
     */
    controller: function DetailController($http, $location, $routeParams, hackathonApi) {
        this.hackathonId = $routeParams['hackathonId'];
        this.hackathon = {};
        
        // Gets the hackathon details from the server using our service.
        hackathonApi.getHackathon(this.hackathonId)
            .then(response => this.hackathon = response.data)
            .catch(err => console.log('there was an error!', err));

        this.viewHackathonDetails = function(hackathon) {
            $location.url(`/${hackathon.id}`);
        }
    }
});

/*
 * Service to call our API endpoints. Inject this into controllers.
 */
hackathon.service('hackathonApi', function($http) {
  this.listHackathons = function() {
    return $http({
        method: 'GET',
        url: '/api/hackathons'
    });
  };

  this.getHackathon = function(hackathonId) {
    return $http({
        method: 'GET',
        url: '/api/hackathons/' + hackathonId
    });
  };
});