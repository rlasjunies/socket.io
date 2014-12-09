
// The controller class. Note that it uses Angular's dependency injection to
// get the $http service (for http requests) and the logger (see above).
//
var RegistrationsViewModel = (function () {
    function RegistrationsViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.registrations = new Array();
        $scope.refresh = function () {
            logger.log("Requesting...");
            $http.get("/api/registrations").success(function (registrations) {
                registrations.forEach(function (r) {
                    return $scope.registrations.push(r);
                });
            });
        };
    }
    return RegistrationsViewModel;
})();
//# sourceMappingURL=registrationsViewModel.js.map
