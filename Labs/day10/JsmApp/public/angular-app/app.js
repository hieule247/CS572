angular.module("JsmApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "angular-app/job-list/jobs.html",
            controller: "JobsController",
            controllerAs: "vm"
        })
        .when("/jobs/:id", {
            templateUrl: "angular-app/job-display/job.html",
            controller: "JobController",
            controllerAs: "vm"
        })
        .when("/jobs/:id/location", {
            templateUrl: "angular-app/location-display/location.html",
            controller: "LocationController",
            controllerAs: "vm"
        })
        ;
}