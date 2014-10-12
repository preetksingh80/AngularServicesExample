var app = angular.module('app', []);

app.controller('appController',['$scope', 'service1', 'serviceWay', function($scope, service1, serviceWay){
    var service = new service1('preet');
    var service2 = new service1('veeru');
    serviceWay.setName('service way');
    
    console.log(service.getName());
    console.log(service2.getName());
    console.log(serviceWay);
    console.log(serviceWay.getName());
    console.log(serviceWay.child.getName());
                                
    $scope.name = service.getName();
                                
   
    //console.log('name is ' + $scope.name);
    
    
}]);

app.factory('service1', function(){
       
    var service1 = function(name){
         this.name = name;
    };
    
    
    service1.prototype.getName = function(){
        return this.name;
    };
    
   
    return service1;
});

app.service('serviceWay', function(){
    
    console.log('called the service way')   
    this.name = '';
    var self = this;
    return{
        setName: function(name){
         self.name = name;
        },
        getName: function(){ return self.name;},
        child: {
            getName: function(){
                console.log(self);
                return self.name + ' child';
                
            }
        }
        
    };
    
    
    
    
});