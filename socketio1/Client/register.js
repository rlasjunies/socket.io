var RegisterViewModel = (function () {
    function RegisterViewModel($scope, $http, logger) {
        this.logger = logger;
        $scope.save = function () {
            $http.post("/api/register", { name: $scope.name, salutation: $scope.salutation, age: $scope.age }, { headers: { "Content-Type": "application/json" } }).success(function (_) {
                alert("You are registered!");
            }).error(function (_) {
                alert("Sorry, not possible!");
            });
        };
    }
    return RegisterViewModel;
})();
//# sourceMappingURL=register.js.map
