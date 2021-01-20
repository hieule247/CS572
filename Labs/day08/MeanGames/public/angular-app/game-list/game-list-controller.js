// 01. Create module: "appName", "controllerName", controllerFunction 
angular.module("meanGames").controller("GamesController", GamesController);

// 02. Implement controller function
function GamesController(GameDataFactory){
        // 0. log for debuging
    console.log("..... GamesController");
    // 1. declare variables
    var vm = this;
    vm.title = "MEAN Games App";
    // 2. parameters: parse and check
    // 3. MAIN
   GameDataFactory.getAllGames().then(function(response){
       vm.games = response; // Remember: Games --> direct data
   });
}

// function GamesController($http){
//     // 0. log for debuging
//     console.log("..... GamesController");
//     // 1. declare variables
//     var vm = this;
//     vm.title = "MEAN Games App";
//     // 2. parameters: parse and check
//     // 3. MAIN
//     $http.get("api/games").then(function(response){
//         vm.games = response.data; // Remember: Games --> direct data
//     });
// }

