angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($http) {
    var vm= this;

    vm.login= function() {
        if (vm.username && vm.password) {
            var user= {
                username: vm.username,
                password: vm.password
            };
            $http.post("/api/users/login", user)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(err) {
                    console.log(err);
                });
        } 
    }
}