angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http){
    // 03: MAIN
    // 3.1: Return values
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        addOneGame: postOneGame,
        delOneGame: deleteOneGame,
        searchGames: postSearchGames
    }
    // 3.2: Function body
    function getAllGames(){
        // 0:
        console.log("..... getAllGames");
        return $http.get("api/games").then(complete).catch(failed);
    }
    // POST one gamse
    function postOneGame(newGame){
        // 0:
        console.log("..... postOneGame");
        return $http.post("api/games", newGame).then(complete).catch(failed);
    }
    // 
    function getOneGame(id){
        return $http.get("api/games/" + id).then(complete).catch(failed);
    }
    // DELETE one game
    function deleteOneGame(id){
        return $http.delete("api/games/" + id).then(complete).catch(failed);
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

    // POST search games
    function postSearchGames(txtSearch){
        // 0:
        console.log("..... postSearchGames");
        return $http.post("api/search", txtSearch).then(complete).catch(failed);
    }
}