angular.module('derpErp', [])

.constant('API_KEY', angular.element(document.getElementsByTagName('head')).attr('data-api-key'))
.constant('API_ROOT', 'http://gek-angular-workshop.herokuapp.com/api')

.controller('quotaInfoController', [
    '$scope', 'API_KEY', 'API_ROOT',
    function ($scope, API_KEY, API_ROOT) {

  $scope.requestsPerSecond = 20;
  $scope.configuration = {
    API_KEY: API_KEY,
    API_ROOT: API_ROOT
  }

}]);