angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController($http) {
    var vm= this;

    vm.register = function() {
        var nameFunc = "register";
        // 0. log for debuging
        console.log("angular...controller..." + nameFunc);

        var user = {username: vm.username, pasword: vm.password};
        console.log("new user...before: ", user);

        if (!vm.username || !vm.password) 
        { 
            vm.err= "Please add a username and password.";
        } else {
            if (vm.password !== vm.rePassword) {
                console.log("password:" + vm.password + "---" + vm.rePassword);
                vm.err= "Please make sure the passwords match.";
            } else {
                console.log("before send to api");
        
               $http.post("/api/users/register", user)
                    .then(function(result) {
                        console.log(result);
                        vm.message= "Successful registration, please login.";
                        vm.err= "";
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            } 
        } 
    } // End vm.register
};