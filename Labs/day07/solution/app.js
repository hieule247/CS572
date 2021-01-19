angular.module("myProperApp", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "controller/main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"
    })
    .when("/about", {
        templateUrl: "controller/about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    })
    .when("/github", {
        templateUrl: "controller/github/github.html",
        controller: "GithubController",
        controllerAs: "githubCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
}