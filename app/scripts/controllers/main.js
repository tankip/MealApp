'use strict';

/**
 * @ngdoc function
 * @name mealAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mealAppApp
 */
angular.module('mealAppApp')
  .controller('MainCtrl',['$scope', 'FBS', '$firebaseObject', 'Auth', function ($scope, FBS, $firebaseObject, Auth) {

    var main = this;

    var auth = Auth.auths();

    //check if the user is logged in to the app
    auth.$onAuth(function(authData) {
      main.authData = authData;
      if(main.authData){
        Auth.name = authData.google.displayName;//save the name of the active user
      }
    });//end of .$onauth
    
  }]);
