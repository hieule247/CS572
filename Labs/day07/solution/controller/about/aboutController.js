angular.module("myProperApp").controller("AboutController", AboutController);

function AboutController() {
    var vm = this;
    this.bio = "This is my bio...!";
}