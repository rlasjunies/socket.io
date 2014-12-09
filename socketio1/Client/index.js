angular.module("RegistrationApp", ["ngRoute"]).factory("logger", function () {
    return new DefaultLogger();
}).controller("RegistrationsController", RegistrationsViewModel).controller("RegisterController", RegisterViewModel).config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "registrations.html",
        controller: "RegistrationsController"
    }).when("/register", {
        templateUrl: "register.html",
        controller: "RegisterController"
    });
});
//# sourceMappingURL=index.js.map
