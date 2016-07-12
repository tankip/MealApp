'use strict';

/**
 * @ngdoc service
 * @name mealAppApp.order
 * @description
 * # order
 * Factory in the mealAppApp.
 */
angular.module('mealAppApp')
  .factory('orderFactory', ['FBS', '$route', '$firebaseObject', '$uibModal', function (FBS, $route, $firebaseObject, $uibModal) {
    var key;

    /**
     * A function to enable a user to create an Order
     * It takes an object meal, the name of the user making it and the restaurant name
     */
    function completeOrder(meal, name, restaurantselect) {

        var food = meal.name;
        var price = meal.price;
        var username = name;
        
        var restaurant= restaurantselect;

        var ref = new Firebase(FBS+'/orders');
        ref.push({
            name: username,
            restaurant: restaurant,
            meal: [{
                name : username,
                food : food,
                price: price
            }],
            totalcost : price,
            status : {
                finalized : false,
                ordered: true,
                delivered: false,
            }
        });
        $uibModal.open({
            template : '<div class="modal-body"><p>You have successfully made an order</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$dismiss()">Okay</button></div>'
        });
        $route.reload();
    }

    /**
     * This function returns all the orders that have been made by users
     */
    function checkOrder() {
        var ref = $firebaseObject(new Firebase(FBS+'/orders/'));
        return ref.$loaded().then(function(userData) {
            return userData;
        });
    }

    /**
     * This function enables a user to add food to an already existing order
     */
    function addFood(key, activeorder, restaurantselect) {
        var ref = $firebaseObject(new Firebase(FBS+'/restaurants/'+ restaurantselect));
        return ref.$loaded().then(function(restaurantsFood) {
            return restaurantsFood;
        }).catch(function(error) {
            console.log('There was an error... ', error);
        });
    }

    /**
     *  A function to fetch a single order that has been placed
     */
    function fetchOrder(orderkey) {
        return new Firebase(FBS+'/orders/'+orderkey+'/meal/');
    }

    function fetchCost(orderkey) {
        var ref = $firebaseObject(new Firebase(FBS+'/orders/'+orderkey));
        return ref.$loaded().then(function(data){
           return data.totalcost;
        }).catch(function(error) {
            console.log('There was an error ' + error);
        });
    }
    function updateCost(orderkey, price) {
        //var totalcost;
        var ref = new Firebase(FBS+'/orders/'+orderkey);
        var obj = $firebaseObject(ref);
        obj.$loaded().then(function(data){
           var totalcost =  data.totalcost;
           totalcost += price;
           ref.child('totalcost').set(totalcost);
        }).catch(function(error) {
            console.log('There was an error ' + error);
        });
    }

    /** 
     * A function to update an already created order
     */
    function updateOrder(meal, orderkey, username) {
        
        var food = meal.name;
        var price = meal.price;

        var err = false;

        var ref = fetchOrder(orderkey);//returns an object containing the meals in a single order 

        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if(childSnapshot.val().name === username) {
                err = true;
                }
                else {
                err = false;
                }
            });
            if(err === true) {
                $uibModal.open({
                    template : '<div class="modal-body"><p>Sorry, you have already submitted an order</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$dismiss()">Okay</button></div>'
                });
                $route.reload();
            }
            else {

            updateCost(orderkey, price);

                ref.push().set({
                    'name' : username,
                    'food' : food,
                    'price': price
                });
                $uibModal.open({
                    template : '<div class="modal-body"><p>You have successfully made an order</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$dismiss()">Okay</button></div>'
                });
                $route.reload();
            }
        });
    }
    

    /**
     * A function to display the foods selected in an order
     */
    function seeOrdered(orderkey) {

        var ref = $firebaseObject(new Firebase(FBS+'/orders/'+orderkey+'/meal/'));
        return ref.$loaded().then(function(ordered) {
            var orderedfood =  ordered;
            return orderedfood;
        });
        
    }


    /**
     * A function to change the status of an order
     * It changes the finalized status from false to true
     */
    function changeStatus(orderkey) {
        var ref = new Firebase(FBS+'/orders/'+orderkey+'/status/');
        ref.set({
            delivered: false,
            finalized: true,
            ordered: true
        });
        $uibModal.open({
            template : '<div class="modal-body">The order was finalized</p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="$dismiss()">Okay</button></div>'
        });
        $route.reload();
    }

    /**
     * The callable functions from this objects
     */
    var orderFactory = {
        completeOrder : completeOrder,
        checkOrder : checkOrder,
        addFood : addFood,
        updateOrder : updateOrder,
        seeOrdered : seeOrdered,
        changeStatus : changeStatus,
        fetchCost : fetchCost,
        key : key
    };
    
    return orderFactory;
  }]);
