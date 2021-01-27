// MergStep 02.2: Create file app.js
angular.module("RsmApp", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "angular-app/repair-list/repairs.html",
            controller: "RepairsController",
            controllerAs: "vm"
        })
        .when("/repairs/:id", {
            templateUrl: "angular-app/repair-display/repair.html",
            controller: "RepairController",
            controllerAs: "vm"
        })
        ;
}