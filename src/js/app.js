angular.module('derpErp', [])

.constant('API_KEY', angular.element(document.getElementsByTagName('head')).attr('data-api-key'))
.constant('API_ROOT', 'http://gek-angular-workshop.herokuapp.com/api')

.controller('quotaInfoController', [
    '$scope', '$http', 'API_KEY', 'API_ROOT',
    function ($scope, $http, API_KEY, API_ROOT) {

  $scope.requestsPerSecond = null;
  $http.get(API_ROOT + '/profile', {
    headers: { Authorization: API_KEY }
  }).then(function (response) {
    $scope.requestsPerSecond = response.data.requests_per_minute/60;
  })

}]);