// MergStep 03.2: Create repair-list-controller.js
angular.module("RsmApp").controller("RepairController", RepairController);

function RepairController($routeParams, RepairDataFactory){
    // 0. log for debuging
    console.log("..... RepairController");
    var vm = this;
    var id = $routeParams.id;
    // 
    console.log("id: ", id);

    RepairDataFactory.getOneRepair(id).then(function(repair){
        vm.repair = repair;
    });
    // Delete One Repair
    vm.delOneRepair = function(){
        RepairDataFactory.delOneRepair(id).then(function(response){
            vm.repair = response;
        });
    }
}

// function RepairController($http, $routeParams){
//     // 0. log for debuging
//     console.log("..... RepairController");
//     var vm = this;
//     var id = $routeParams.id;
//     // 
//     console.log("id: ", id);

//     $http.get("api/repairs/" + id).then(function(response){
//         vm.repair = response.data;
//     });
// }


