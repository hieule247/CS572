angular.module("myProperApp").controller("GithubController", GithubController);

function GithubController($http) {
    var vm = this;
    $http.get("https://dog.ceo/api/breeds/image/random")
    .then(function(response){
        vm.github = response.data;
    });
}