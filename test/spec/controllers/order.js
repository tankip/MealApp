'use strict';

describe('Controller: OrderCtrl', function () {

  // load the controller's module
  beforeEach(module('mealAppApp'));

  var OrderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderCtrl = $controller('OrderCtrl', {
      $scope: scope
    });
  }));

  //a test for the function to calculate the totalcost of the Orders placed
  it('Should take an array containing the prices of the food ordered and calculate the total cost', function () {
     OrderCtrl.prices = [200, 100];
     OrderCtrl.totalcost =  OrderCtrl.calculateCost(OrderCtrl.prices);
     expect(OrderCtrl.totalcost).toBe(300);
  });//end of calculateCost test

  //A function to calculate the function to complete order

});

