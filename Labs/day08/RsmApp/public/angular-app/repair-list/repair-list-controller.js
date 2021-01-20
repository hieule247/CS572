// MergStep 03.2: Create repair-list-controller.js
angular.module("RsmApp").controller("RepairsController", RepairsController);

function RepairsController(RepairDataFactory){
    var vm = this;
    vm.title = "RSM - REPAIR SHOP MANAGMENT";

    RepairDataFactory.getAllRepairs().then(function(repairs){
        vm.repairs = repairs;
    })
}

// function RepairsController($http){
//     var vm = this;
//     vm.title = "RSM - REPAIR SHOP MANAGMENT";

//     $http.get("api/repairs").then(function(response){
//         vm.repairs = response.data;
//     })
// }
