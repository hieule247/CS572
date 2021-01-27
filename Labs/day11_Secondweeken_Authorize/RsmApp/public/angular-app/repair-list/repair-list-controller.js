// MergStep 03.2: Create repair-list-controller.js
angular.module("RsmApp").controller("RepairsController", RepairsController);

function RepairsController(RepairDataFactory){
    var vm = this;
    vm.title = "RSM - REPAIR SHOP MANAGMENT";
    vm.isSubmited = false;

    RepairDataFactory.getAllRepairs().then(function(repairs){
        vm.repairs = repairs;
    })

    // 
    vm.addOneRepair = function(){
   
        var postData = {
            pid: vm.newRepairPId, 
            machineType: vm.newRepairMachineType, 
            machineCode: vm.newRepairMachineCode, 
            customerName: vm.newRepairCustomerName, 
            dateReceive: vm.newRepairDateReceive, 
            dateReturn: vm.newRepairDateReturn, 
            pricePredict: vm.newRepairPricePredict, 
            price: vm.newRepairPrice, 
            status: vm.newRepairStatus, 
            notes: vm.newRepairNotes            
        }
        console.log("..... new Repair: ", postData);

        if (vm.repairForm.$valid){
            RepairDataFactory.addOneRepair(postData).then(function(response){
                console.log("Repair saved");
            });
        } else {
            vm.isSubmited = true;
        }
    }
}

// function RepairsController($http){
//     var vm = this;
//     vm.title = "RSM - REPAIR SHOP MANAGMENT";

//     $http.get("api/repairs").then(function(response){
//         vm.repairs = response.data;
//     })
// }
