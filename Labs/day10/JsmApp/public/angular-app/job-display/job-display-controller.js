angular.module("JsmApp").controller("JobController", JobController);

function JobController($routeParams, JobDataFactory){
    var vm = this;

    var id = $routeParams.id;
    // Get One
    JobDataFactory.getOneJob(id).then(function(response){
        vm.job = response;
    });
    // Delete One
    vm.delOneJob = function(){
        JobDataFactory.delOneJob(id).then(function(response){
            vm.job = response;
        });
    }
    // updOneJob
    vm.updOneJob = function(){
        // 0.
        console.log("..... client updOneJob");
        var postData = {
            title: vm.newJobTitle, 
            salary: vm.newJobSalary, 
            description: vm.newJobDescription, 
            experience: vm.newJobExperience, 
            postDate: vm.newJobPostDate, 
            skills: vm.newJobSkills, 
            location: vm.newJobLocation
        }
        // o.
        console.log("..... update Item: ", postData);

        if (vm.jobForm.$valid){
            JobDataFactory.updOneJob(id, postData).then(function(response){
                console.log("Job saved");
            });
        } else {
            vm.isSubmited = true;
        }
    }    
}
