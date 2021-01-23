angular.module("JsmApp").controller("LocationController", LocationController);

// address, street, city, state, zip

function LocationController($routeParams, JobDataFactory){
    var vm = this;

    var jobId = $routeParams.id;
    
    vm.jobId = jobId;
    // Get One
    JobDataFactory.getOneLocation(jobId).then(function(response){
        vm.location = response;
    });
    // Delete One
    vm.delOneLocation = function(){
        JobDataFactory.delOneLocation(jobId).then(function(response){
            vm.job = response;
        });
    }
    // addOneLocation
    vm.addOneLocation = function(){
        // 0.
        console.log("..... client addOne");
        var postData = {
            address: vm.newLocationAddress, 
            street: vm.newLocationStreet, 
            city: vm.newLocationCity, 
            state: vm.newLocationState, 
            zip: vm.newLocationZip 
        }
        // o.
        console.log("..... add one Item: ", postData);

        if (vm.locationForm.$valid){
            JobDataFactory.addOneLocation(jobId, postData).then(function(response){
                console.log("Location saved");
            });
        } else {
            vm.isSubmited = true;
        }
    }   
    
    // updOneJob
    vm.updOneLocation = function(){
        // 0.
        console.log("..... client updOne");
        var postData = {
            address: vm.newLocationAddress, 
            street: vm.newLocationStreet, 
            city: vm.newLocationCity, 
            state: vm.newLocationState, 
            zip: vm.newLocationZip 
        }
        // o.
        console.log("..... upd one Item: ", postData);

        if (vm.locationForm.$valid){
            JobDataFactory.updOneLocation(jobId, postData).then(function(response){
                console.log("Location saved");
            });
        } else {
            vm.isSubmited = true;
        }
    }        
}
