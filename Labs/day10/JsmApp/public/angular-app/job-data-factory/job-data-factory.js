angular.module("JsmApp").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    // 0.
    console.log("..... JobDataFactory");
    //
    return {
        getAllJob: getAllJob,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        updOneJob: updOneJob,
        delOneJob: delOneJob,
        // location
        getOneLocation: getOneLocation,
        addOneLocation: addOneLocation,
        updOneLocation: updOneLocation,
        delOneLocation: delOneLocation        
    }

    // getAllJob
    function getAllJob(){
        console.log("..... getAllJob");
        return $http.get("api/jobs").then(complete).catch(failed);
    }
    // addOneJob
    function addOneJob(newJob){
        console.log("..... addOneJob: ", newJob);
        return $http.post("api/jobs", newJob).then(complete).catch(failed);
    }

    // getOneJob
    function getOneJob(id){
        console.log("..... getOneJob");
        return $http.get("api/jobs/"+ id).then(complete).catch(failed);
    }
    // delOneJob
    function delOneJob(id){
        console.log("..... delOneJob");
        return $http.delete("api/jobs/"+ id).then(complete).catch(failed);
    }
    // updOneJob
    function updOneJob(id, newJob){
        console.log("..... updOneJob");
        return $http.put("api/jobs/" + id, newJob).then(complete).catch(failed);
    }
    // complete
    function complete(response){
        return response.data;
    }
    // failed
    function failed(error){
        return error.status.statusText;
    }

    // getOneLocation
    function getOneLocation(id){
        console.log("..... getOneLocation");
        return $http.get("api/jobs/"+ id + "/location").then(complete).catch(failed);
    }
    // addOneLocation
    function addOneLocation(id, newLocation){
    console.log("..... addOneLocation");
    return $http.post("api/jobs/"+ id + "/location", newLocation).then(complete).catch(failed);
    }    
    // addOneLocation
    function updOneLocation(id, newLocation){
        console.log("..... updOneLocation");
        return $http.put("api/jobs/"+ id + "/location", newLocation).then(complete).catch(failed);
        }      
    // addOneLocation
    function delOneLocation(id){
        console.log("..... getOneLocation");
        return $http.delete("api/jobs/"+ id + "/location").then(complete).catch(failed);
    }    
        
}