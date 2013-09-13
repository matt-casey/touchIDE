'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.dataService', 'myApp.directives', 'ngSanitize'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/:page/:project/:file')
        .otherwise({ redirectTo: '0/0/0' });
    }])
    .run(function($rootScope, $location){
        // $rootScope.$on('$routeChangeSuccess', function(){
        //     console.log('change of route');
        // })
    });
