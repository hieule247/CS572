// 01: Register appName
angular.module("meanGames", ["ngRoute"]).config(config);

// 02. Implement config function: Routes manager
function config($routeProvider, $locationProvider){
    // 0: log for debuding
    console.log("....angular-app/app.js....config()");

    // $locationProvider.hasPrefix("");

    $routeProvider
        .when("/", {
            templateUrl: "angular-app/welcome/welcome.html"
            })
        .when("/games", {
            templateUrl: "angular-app/game-list/games.html",
            controller: "GamesController",
            controllerAs: "vm"
        })
        .when("/games/:id", {
            templateUrl: "angular-app/game-display/game.html",
            controller: "GameController",
            controllerAs: "vm"
        })
        .when("/register", {
            templateUrl: "angular-app/register/register.html",
            controller: "RegisterController",
            controllerAs: "vm"
        })
        .when("/search", {
            templateUrl: "angular-app/game-search/game-search.html",
            controller: "GameSearchController",
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: "/"
        })
    ;
}
