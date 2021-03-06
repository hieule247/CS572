angular.module("meanGames").controller("GameController", GameController);

function GameController($routeParams, GameDataFactory){
    var vm = this;
    var id = $routeParams.id;
    GameDataFactory.getOneGame(id).then(function(response){
        vm.game = response;
        vm.rating = response.rate;
    });
}