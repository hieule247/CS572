// 01. Create module: "appName", "controllerName", controllerFunction 
angular.module("meanGames").controller("GameSearchController", GameSearchController);

// 02. Implement controller function
function GameSearchController(GameDataFactory){
    // 0. log for debuging
    console.log("..... GamesController");
    // 1. declare variables
    var vm = this;
    vm.title = "Search Games";
    // 2. parameters: parse and check
    // 3. MAIN
    // Search Games
    // GameDataFactory.getOneGame(id).then(function(response){
    //     // 0.
    //     console.log("....ctrlr....getOneGame");
    //     vm.game = response;
    //     vm.rating = response.rate;
    // });

    vm.searchGames = function() {
        var postData = {
             title: vm.newGameTitle
        }
        // 
        console.log("....Search value: ", postData);
        GameDataFactory.searchGames(postData).then(function(response){
            vm.games = response;
            vm.rating = response.rate;
        });
    }
  
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

