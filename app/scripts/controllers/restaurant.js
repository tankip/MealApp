'use strict';

/**
 * @ngdoc function
 * @name mealAppApp.controller:RestaurantCtrl
 * @description
 * # RestaurantCtrl
 * Controller of the mealAppApp
 */
angular.module('mealAppApp')
  .controller('RestaurantCtrl', ['restaurantFactory', 'restaurantFoodFactory', '$uibModal', function (restaurantFactory, restaurantFoodFactory, $uibModal) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var food = this;

    food.showRestaurant = true;
    food.showFoods = false;

    //Fetch the restaurants that offer food delivery
    food.fetchRestaurant = function() {
      restaurantFactory.fetchRestaurant().then(function(data){
        food.restaurants = data;
        food.showRestaurant = true;
        food.showFoods = false;
      });
    };//end of function to fetch the restaurants

    food.fetchRestaurant();//Initiate the restaurants 

    //Function to fetch the foods that are in a restaurant selected
    food.selectFoods = function() {
      restaurantFactory.selectFoods(food.restaurantselect).then(function (data) {
        
        restaurantFoodFactory.foodsinrest = data.foods;
        restaurantFoodFactory.restaurant = data.restname;
        restaurantFactory.restaurant = data.restname;
        restaurantFoodFactory.tab = true;

        $uibModal.open({
          template: '<restaurant-food></restaurant-food>'
        });

      });
    };//end of function to show foods in a restaurant selected 
  }]);
