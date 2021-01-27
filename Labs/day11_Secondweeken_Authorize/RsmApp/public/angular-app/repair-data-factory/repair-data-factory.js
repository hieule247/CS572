// MergeStep 05.2: Create file repair-data-factory.js
angular.module("RsmApp").factory("RepairDataFactory", RepairDataFactory);

function RepairDataFactory($http){
    // 0. log for debuging
    console.log("..... RepairDatFactory");
    return {
        getAllRepairs: getAllRepairs,
        getOneRepair: getOneRepair,
        addOneRepair: postOneRepair,
        delOneRepair: deleteOneRepair
    }
    // Function body
    function getAllRepairs(){
        console.log("..... getAllRepairs");
        return $http.get("api/repairs").then(complete).catch(failed);        
    }

    function postOneRepair(newRepair){
        console.log("..... addOneRepair", newRepair);
        return $http.post("api/repairs", newRepair).then(complete).catch(failed);        
    }

    function getOneRepair(id){
        console.log("..... getOneRepair");
        return $http.get("api/repairs/" + id).then(complete).catch(failed); 
    }

    function deleteOneRepair(id){
        console.log("..... deleteOneRepair");
        return $http.delete("api/repairs/" + id).then(complete).catch(failed); 
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}