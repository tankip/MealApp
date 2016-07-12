'use strict';

/**
 * @ngdoc service
 * @name mealAppApp.login
 * @description
 * # login
 * Factory in the mealAppApp.
 */
angular.module('mealAppApp')
  .factory('Auth', ['FBS', '$firebaseAuth', '$window', function (FBS, $firebaseAuth, $window) {
    
    var ref = new Firebase(FBS);

    var auth = $firebaseAuth(ref);
    
    var isNewUser = true;

    var name;
    /**
     * It enables a user to log in to the system
     */
    function createUser() {
        return auth.$authWithOAuthPopup('google').then(function(authData) {
            if (authData && isNewUser) {
                ref.child('users').child(authData.uid).set({
                    provider: authData.provider,
                    name: authData.google.displayName
                });
            }
            $window.location.href = '/';
        }).catch(function(error) {
            console.log(error); 
        });
    }
    /**
     * It logs a user out of the app
     */
    function destroyUser() {
      auth.$unauth();  
    }

    
    function auths () {
        return auth;
    }

    /**
     * An object containing the callable functions in this authFactory
     */
    var Auth = {
        createUser : createUser,
        destroyUser : destroyUser,
        auths : auths,
        name : name
    };

    return Auth;
  }]);
