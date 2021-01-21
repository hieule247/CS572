// 01. Create module: "appName", "controllerName", controllerFunction 
angular.module("meanGames").controller("GamesController", GamesController);

// 02. Implement controller function
function GamesController(GameDataFactory){
        // 0. log for debuging
    console.log("..... GamesController");
    // 1. declare variables
    var vm = this;
    vm.title = "MEAN Games App";
    vm.isSubmited = false;
    // 2. parameters: parse and check
    // 3. MAIN
   GameDataFactory.getAllGames().then(function(response){
       vm.games = response; // Remember: Games --> direct data
   });

   vm.addOneGame = function() {
       var postData = {
            title: vm.newGameTitle,
            year: vm.newGameYear,
            rate: vm.newGameRating,
            price: vm.newGamePrice,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge
        //    designers: vm.newGameDesigner

        //   title: "vm.newGameTile",
        //   year: "2021",
        //   rate: "1",
        //   price: "2",
        //   minPlayers: "3",
        //   maxPlayers: "4",
        //   minAge: "7"
         //    designers: "vm.newGameDesigner"
       }
       // 
       console.log("....new Game value: ", postData);

       if (vm.gameForm.$valid){
            GameDataFactory.addOneGame(postData).then(function(response){
                console.log("Game saved");
            }).catch(function(error){
                console.log(error);
            });
       } else {
           vm.isSubmited = true;
       }
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

