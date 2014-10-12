var app = angular.module('app', []);

app.controller('appController',['$scope', 'factory', 'service', 'partiesMilestone', function($scope, factory, service, partiesMilestone){
    factory.setName('preet');
    factory.setName('sunny');
    console.log(factory.getName());
     console.log(factory.child.getName());
    
    service.setName('service way 2');
    //serviceWay.setName('service way 3');
    console.log(service.getName());
    console.log(service.child.getName());
    $scope.nameFromFactory = factory.getName() + ',' + factory.child.getName();
    
    $scope.nameFromService = service.getName() + ',' + service.child.getName() ;
                                
    partiesMilestone.setJob({id: 1});
                                console.log(partiesMilestone);
    partiesMilestone.show();
    console.log(partiesMilestone.url());
    console.log(partiesMilestone.subMilestones[0].url());
    
    //console.log('name is ' + $scope.name);
    
    
}]);

app.factory('factory', function(){
    console.log('called the factory');
   
    this.name = '';
    var self = this;
    var service1 = {
        setName: function(name){
         self.name = name;
        },
        getName: function(){ return self.name;},
        child: {
            getName: function(){
                return self.name + ' child';
                
            }
        }
    }
    
    
      
    return service1;
});

app.service('service', function(){
    console.log('called the service');   
    this.name = '';
    var self = this;
    return{
        setName: function(name){
         self.name = name;
        },
        getName: function(){ return self.name;},
        child: {
            getName: function(){
                return self.name + ' child';
                
            }
        }
        
    };
    
    
    
    
});


app.service("partiesMilestone",  
    function() {
        'use strict';

        this.job = {};

        var self = this; // copy the this reference to use in nested object literls
      
        return {
            setJob: function(job) { self.job = job;},
            name: 'Parties',
            order: 1,
            url:  function(){ 
                console.log(self.job.id);
                return  '#/parties/' + self.job.id;
            },
            show: function () {
                console.log(self.job);
                console.log('called parties MileStone show');
                return true;
            },
            icon: 'fa fa-users',
            path: '#/parties/',
            subMilestones: [
                {
                    name: 'Customer Party',
                    order: 1,
                     url:  function(){ 
                console.log(self.job.id);
                return  '#/parties/' + self.job.id;
            },
                    show: function () {
                        return true;
                    },
                    result: function () {
                        return self.job.parties[0];

                    }
                }
                ,
                {
                    name: 'Householder Consent',
                    order: 1,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return self.job.isGreenDealECO;
                    },
                    result: function () {
                        return self.job.workDocuments.some(function(document) {
                            if (checkDocumentByType.isDocumentAvailable(self.job, CONST.lookup.documentType.homeOwnerConsent)) {
                                    return true;
                                } else return false;
                            }
                        );
                    }
                }
                ,
                {
                    name: 'Landlord Party',
                    order: 2,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return $.inArray(job.tenureTypeLookupId, [1, 4]) < 0;
                    },
                    result: function () {
                        if ($.inArray(self.job.tenureTypeLookupId, [1, 4]) >= 0 && self.job.parties[0]) {
                            return true;
                        }
                        else return false;

                    }
                }
                ,
                {
                    name: 'Landlord Consent',
                    order: 1,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return $.inArray(self.job.tenureTypeLookupId, [1, 4]) < 0;
                    },
                    result: function () {
                        return self.job.workDocuments.some(function(document) {
                                if (checkDocumentByType.isDocumentAvailable(self.job, CONST.lookup.documentType.landLordConsent)) {
                                    return true;
                                } else return false;
                            }
                        );
                    }
                }
                ,
                {
                    name: 'ECO Eligibility',
                    order: 3,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return self.job.isGreenDealECO;
                    },
                    result: function () {
                        return ecoEligibility.isEcoEligible(self.job);

                    }
                }
                ,
                {
                    name: 'ECO Documentation',
                    order: 4,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return self.job.isGreenDealECO;
                    },
                    result: function () {
                        return ecoEligibility.isDocumentSupplied(self.job);

                    }
                }
                ,
                {
                    name: 'ECO Audit',
                    order: 5,
                    url: '#/parties/' + self.job.id,
                    show: function () {
                        return self.job.isGreenDealECO;
                    },
                    result: function () {
                        return ecoEligibility.isAudited(self.job);

                    }
                }
            ],
            className: 'parties'
        }


    }
);