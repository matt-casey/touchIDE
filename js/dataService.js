'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var myApp = angular.module('myApp.dataService', [], function($provide){})
.value('version', '0.1');

myApp

//===================================================
//------------DATA SERVICE----------------------------
//===================================================
.factory('dataService', function($rootScope, $http, $window, $location, $routeParams){
	
//================= DATA ============================

	

//============RETURN API=============================
	return{

	}

});