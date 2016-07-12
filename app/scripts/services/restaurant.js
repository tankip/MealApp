'use strict';

/**
 * @ngdoc service
 * @name mealAppApp.restaurant
 * @description
 * # restaurant
 * Factory in the mealAppApp.
 */
angular.module('mealAppApp')
  .factory('restaurantFactory',['FBS', '$firebaseObject', function (FBS, $firebaseObject) {
    var restaurant;
    
    /**
     *Function to fetch the restaurants that provide meal delivery
    */
    function fetchRestaurant () {
        var ref = $firebaseObject(new Firebase(FBS+'/restaurants/'));
        return ref.$loaded().then(function(restaurantsData) {
            return restaurantsData;
        }).catch(function(error) {
            console.log('There was an error... ', error);
        });
    }

    /**
     * Function to fetch foods that a restaurant offers
     * It takes the restaurant key as a parameter
     */
    function selectFoods(restaurantselect) {
        var ref = $firebaseObject(new Firebase(FBS+'/restaurants/'+ restaurantselect));
        return ref.$loaded().then(function(restaurantsFood) {
            return restaurantsFood;
        }).catch(function(error) {
            console.log('There was an error... ', error);
        });
    }

    /**
     * An object containing all the functions that are exposed by the restaurantFactory
     */
    var restaurantFactory = {
        fetchRestaurant : fetchRestaurant,
        selectFoods : selectFoods,
        restaurant : restaurant
    };

    return restaurantFactory;
}])
.factory('restaurantFoodFactory', function() {

    var foodsinrest;//hold the foods that are offered in a restaurant
    var restaurantSelected;//holds the name of the food 
    var tab;

    var restaurantFoodFactory = {
        foodsinrest : foodsinrest,
        restaurantSelected : restaurantSelected,
        tab : tab
    };

    return restaurantFoodFactory;
  });
