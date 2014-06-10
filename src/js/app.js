angular.module('derpErp', ['ui.bootstrap'])

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

.controller('paymentListController', [
    '$scope', '$http', '$window', '$modal', 'API_KEY', 'API_ROOT',
    function ($scope, $http, $window, $modal, API_KEY, API_ROOT) {

  $scope.payments = [];

  $scope.fetchPayments = function () {
    $http.get(API_ROOT + '/payments/', {
      headers: { Authorization: API_KEY }
    }).then(function (response) {
      $scope.payments = response.data.items;
    }, function (response) {
      var msg = response.status == 420 ? 'Retry Later' : 'Unknown Error';
      $window.alert(msg);
    });
  };

  $scope.newPayment = function () {
    $modal.open({
      templateUrl: 'views/new-payment.html',
      scope: $scope
    }).result.then(function (res) {
      $scope.payments.unshift(res);
    });
  };

  $scope.fetchPayments();

}])

.controller('newPaymentFormController', [
    '$scope', '$http', '$window', 'API_KEY', 'API_ROOT',
    function ($scope, $http, $window, API_KEY, API_ROOT) {

  $scope.payment = null;
  $scope.save = function () {
    $http.post(API_ROOT + '/payments/', $scope.payment, {
      headers: { Authorization: API_KEY }
    }).then(function (response) {
      $scope.$close(response.data);
    }, function (response) {
      var msg = response.status == 420 ? 'Retry Later' : 'Unknown Error';
      $window.alert(msg);
    });
  }
}]);