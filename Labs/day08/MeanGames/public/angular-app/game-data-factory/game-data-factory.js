angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http){
    // 03: MAIN
    // 3.1: Return values
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame
    }
    // 3.2: Function body
    function getAllGames(){
        // 0:
        console.log("..... getAllGames");
        return $http.get("api/games").then(complete).catch(failed);
    }
    // 
    function getOneGame(id){
        return $http.get("api/games/" + id).then(complete).catch(failed);
    }
    // complete
    function complete(response){
        console.log(response.data);
        return response.data;
    }
    // failed
    function failed(error){
        return error;
    }
}