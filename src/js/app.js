angular.module('derpErp', ['ui.bootstrap', 'ngResource'])

.constant('API_KEY', angular.element(document.getElementsByTagName('head')).attr('data-api-key'))
.constant('API_ROOT', 'http://gek-angular-workshop.herokuapp.com/api')

.factory('Profile', [
    '$resource', 'API_KEY', 'API_ROOT',
    function ($resource, API_KEY, API_ROOT) {

  return $resource(API_ROOT + '/profile', {}, {
    get: {headers: {Authorization: API_KEY}}
  });
}])

.factory('Payment', [
    '$resource', 'API_KEY', 'API_ROOT',
    function ($resource, API_KEY, API_ROOT) {

  return $resource(API_ROOT + '/payments/ ', {}, {
    query: {isArray: false, headers: {Authorization: API_KEY}},
    save: {method: 'POST', headers: {Authorization: API_KEY}}
  });
}])

.controller('quotaInfoController', [
    '$scope', 'Profile',
    function ($scope, Profile) {

  $scope.requestsPerSecond = null;
  Profile.get().$promise.then(function (profile) {
    $scope.requestsPerSecond = profile.requests_per_minute/60;
  });

}])

.controller('paymentListController', [
    '$scope', '$window', '$modal', 'Payment',
    function ($scope, $window, $modal, Payment) {

  $scope.payments = [];

  $scope.fetchPayments = function () {
    Payment.query().$promise.then(function (lst) {
      $scope.payments = lst.items;
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
    '$scope', '$window', 'Payment',
    function ($scope, $window, Payment) {

  $scope.payment = null;
  $scope.save = function () {
    Payment.save($scope.payment).$promise.then(function (payment) {
      $scope.$close(payment);
    }, function (response) {
      var msg = response.status == 420 ? 'Retry Later' : 'Unknown Error';
      $window.alert(msg);
    });
  }
}]);