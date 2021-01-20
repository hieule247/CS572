// MergeStep 05.2: Create file repair-data-factory.js
angular.module("RsmApp").factory("RepairDataFactory", RepairDataFactory);

function RepairDataFactory($http){
    // 0. log for debuging
    console.log("..... RepairDatFactory");
    return {
        getAllRepairs: getAllRepairs,
        getOneRepair: getOneRepair
    }
    // Function body
    function getAllRepairs(){
        console.log("..... getAllRepairs");
        return $http.get("api/repairs").then(complete).catch(failed);        
    }

    function getOneRepair(id){
        console.log("..... getOneRepair");
        return $http.get("api/repairs/" + id).then(complete).catch(failed); 
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        error.status.statusText;
    }
}