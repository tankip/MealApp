'use strict';

/**
 * @ngdoc function
 * @name mealAppApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the mealAppApp
 */
angular.module('mealAppApp')
  .controller('OrderCtrl', ['$scope', 'orderFactory', 'restaurantFactory', 'restaurantFoodFactory', 'Auth', '$uibModal', function ($scope, orderFactory, restaurantFactory, restaurantFoodFactory, Auth, $uibModal) {

    var order = this;

    order.active = true;
    order.history = false;
    order.seeFood = false;
    order.updateFood = false;
   

    //function to enable a user to place an order
    order.completeOrder = function(meal) {
      orderFactory.completeOrder(meal, Auth.name, restaurantFactory.restaurant);
    };//end of function to place an OrderController

    //function to retrieve all the orders made
    orderFactory.checkOrder().then(function(orders) {
        order.orders = orders;
    });

    //function to display all the active orders
    order.activeOrder = function() {
      order.active = true;
      order.history = false;
      order.seeFood = false;
      order.updateFood = false;
    };

    //function to display orders history
    order.orderHistory = function () {
      order.active = false;
      order.history = true;
      order.seeFood = false;
      order.updateFood = false;
    };

    order.restaurant = restaurantFactory.restaurant;

    //function to display the food in a restaurant selected
    order.addFood = function(key, activeorder) {
      order.history = false;
      order.updateFood = true;
      order.seeFood = false;

      orderFactory.key = key;

      order.restaurant = activeorder.restaurant;

      restaurantFactory.fetchRestaurant().then(function(data){
        angular.forEach(data, function(value, key) {
          if(order.restaurant === value.restname) {
            order.restaurantselect = key;
            restaurantFactory.selectFoods(order.restaurantselect).then(function (data) {
              //order.foodsinrest = data.foods;
              restaurantFoodFactory.foodsinrest = data.foods;
              restaurantFoodFactory.tab = false;
              restaurantFoodFactory.restaurant = data.restname;
              $uibModal.open({
                template: '<restaurant-food></restaurant-food>'
              });
            });
          }
        });
      });

    };

    order.updateOrder = function(meal) {
      orderFactory.updateOrder(meal, orderFactory.key, Auth.name);
    };

    order.seeOrdered = function(key) {
     
      orderFactory.key = key;
      order.seeFood = true;
      order.active = false;
      order.history = false;
      order.updateFood = false;


      order.prices = [];//array to hold the prices of the foods ordered

      orderFactory.seeOrdered(orderFactory.key).then(function(orderedfood) {
        order.foodordered = orderedfood;
        console.log(order.foodordered);
        
        angular.forEach(orderedfood, function(value) {
            order.prices.push(value.price);
        });
        console.log(order.prices);

        order.totalcost = order.calculateCost(order.prices);
      });
    };

    //function to calculateCost of the foods ordered
    order.calculateCost = function(prices) {
        function add(a, b) {
          return a + b;
        }
        var sum  = prices.reduce(add, 0);
        return sum;
    };//end of calculateCost

    order.changeStatus = function() {
      orderFactory.changeStatus(orderFactory.key);
    };
  }]);
