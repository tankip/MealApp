'use strict';

/**
 * @ngdoc overview
 * @name mealAppApp
 * @description
 * # mealAppApp
 *
 * Main module of the application.
 */
angular
  .module('mealAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        resolve: {
            'currentAuth': function(Auth) {
              var auth = Auth.auths();
              return auth.$requireAuth();
            }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/orders', {
        templateUrl: 'views/order.html',
         resolve: {
            'currentAuth': function(Auth) {
              var auth = Auth.auths();
              return auth.$requireAuth();
            }
          }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      if (error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  })
  .constant('FBS', 'https://incandescent-inferno-9594.firebaseio.com')
  .directive('restaurantFood', function() {
    return {
      restrict : 'E',
      templateUrl : '/views/foods.html',
      controller : function(restaurantFoodFactory, $scope) {
        $scope.restaurant = restaurantFoodFactory.restaurant;
        $scope.foodsinrest = restaurantFoodFactory.foodsinrest;
        $scope.tab = restaurantFoodFactory.tab;
      }
    };
  });
