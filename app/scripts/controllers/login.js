'use strict';

/**
 * @ngdoc function
 * @name mealAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mealAppApp
 */
angular.module('mealAppApp')
  .controller('LoginCtrl',['Auth','$window', function (Auth, $window) {
      var login = this;
      login.loginUser = function() {
          Auth.createUser().then(function() {
           $window.location.href = '/';
          });
      };
      
      login.logout = function () {
          Auth.destroyUser();
          $window.location.href = '/';
          console.log('Successfully logged out');
      };

     
  }]);