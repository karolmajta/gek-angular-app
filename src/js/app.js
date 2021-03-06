angular.module('derpErp', ['ui.bootstrap', 'ngResource'])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.push('throttlingInterceptor');
}])

.constant('API_KEY', angular.element(document.getElementsByTagName('head')).attr('data-api-key'))
.constant('API_ROOT', 'http://gek-angular-workshop.herokuapp.com/api')

.factory('Profile', [
    '$resource', 'API_KEY', 'API_ROOT',
    function ($resource, API_KEY, API_ROOT) {

  return $resource(API_ROOT + '/profile', {});
}])

.factory('Payment', [
    '$resource', 'API_KEY', 'API_ROOT',
    function ($resource, API_KEY, API_ROOT) {

  return $resource(API_ROOT + '/payments/ ', {}, {
    query: {isArray: false}
  });
}])

.factory('authInterceptor', ['API_KEY', function (API_KEY) {
  return {
    request: function (config) {
      config.headers.Authorization = API_KEY;
      return config;
    }
  }
}])

.factory('throttlingInterceptor', [
    '$window', '$injector', '$timeout', '$q',
    function ($window, $injector, $timeout, $q) {

  return {
    responseError: function (rejection) {
      var $http = $injector.get('$http');
      var d = $q.defer();
      $timeout(function () {
        $http(rejection.config).then(function (r) { d.resolve(r); });
      }, rejection.data.retry_in * 1000);
      return d.promise;
    }
  }
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
    });
  }
}]);