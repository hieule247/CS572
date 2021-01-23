angular.module("JsmApp").controller("JobsController", JobsController);

function JobsController(JobDataFactory){
    var vm = this;
    vm.title = "JSM - Job Search Management";

    vm.isSubmited = false;
    
    // getAllJob
    JobDataFactory.getAllJob().then(function(jobs){
        vm.jobs = jobs;
    });

    // addOneJob
    vm.addOneJob = function(){
        // 0.
        console.log("..... client addOneJob");
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
        console.log("..... new Item: ", postData);

        if (vm.jobForm.$valid){
            JobDataFactory.addOneJob(postData).then(function(response){
                console.log("Job saved");
            });
        } else {
            vm.isSubmited = true;
        }
    }
}