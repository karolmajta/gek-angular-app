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

}])

.controller('paymentListController', ['$scope', function ($scope) {
  $scope.payments = [
    { uuid: "1", name: "Mickey Mouse", value: 50 },
    { uuid: "2", name: "Duffy Duck", value: 200 },
    { uuid: "3", name: "Lucky Luke", value: 18 }
  ];
}]);