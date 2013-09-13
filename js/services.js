'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var myApp = angular.module('myApp.services', [], function($provide){})
.value('version', '0.1');

myApp

//===================================================
//------------NAV SERVICE----------------------------
//===================================================
.factory('navService', function($rootScope, $http, $window, $location, $routeParams){

	//====LOCATION====================

	function location(type, id){
		console.log('changing ' + type + ' to ' + id)
		type === 'page'    ? $location.path('/' + id 				   + '/' + $routeParams.project + '/' + $routeParams.file ) : '';
		type === 'project' ? $location.path('/' + $routeParams.page    + '/' + id                   + '/' + $routeParams.file ) : '';
		type === 'file'    ? $location.path('/' + $routeParams.page    + '/' + $routeParams.project + '/' + id 				  ) : '';
		return $routeParams;
	}

    $rootScope.$on('$routeChangeSuccess', function(){
        var updatePage;
        var updateProject;
        var updateFile;
        var currentPage    = $routeParams.page;
        var currentProject = $routeParams.project;
        var currentFile    = $routeParams.file;
        isFinite(currentPage)    && currentPage    < pageList.length    				  && currentPage    >= 0 ? updatePage    = false : updatePage    = true;
        isFinite(currentProject) && currentProject < projectList.length 				  && currentProject >= 0 ? updateProject = false : updateProject = true;
        if (parseInt(currentPage) !== 3) {
        isFinite(currentFile)    && currentFile    < files()[currentPg().name].length     && currentFile    >= 0 ? updateFile    = false : updateFile    = true;
        };
        if (updatePage || updateProject || updateFile) {
        	console.log('fixing path from ' + $location.path());
        	$location.path('/0/0/0');
        };
    })

	//====PAGES=======================

	var pageList = [
		{'id': 0, 'name': 'HTML',		'enabled':true,	 isSelected: function(){ return String(this.id) === $routeParams.page}	},
		{'id': 1, 'name': 'CSS',	    'enabled':true, isSelected: function(){ return String(this.id) === $routeParams.page}	},
		{'id': 2, 'name': 'Javascript',	'enabled':false, isSelected: function(){ return String(this.id) === $routeParams.page}	},
		{'id': 3, 'name': 'Preview', 	'enabled':true,	 isSelected: function(){ return String(this.id) === $routeParams.page}	}
	]

	var page = {
		list: 	  function(){ return pageList        },
		goTo:     function(id){ location('page',id)  },
		selected: function(){ return currentPg()     }
	}

	function currentPg(){
		return pageList[$routeParams.page];
	}

	//====PROJECTs====================

	var projectList = [];

	function newProject(name){
		var output  	  = {
			'id'  		: projectList.length,
			'name'		: name !== undefined && name.length ? name : 'Project' + output.id,
			'HTML'		: createHTML(),
			'CSS'		: createCSS(),
			isSelected	: function(){ return String(this.id) === $routeParams.project },
			select      : function(){ location('project', this.id) },
			remove		: function(){
				var tempId = this.id;
				console.log('removed',projectList.splice(tempId, 1));
				for (var i = tempId; i < projectList.length; i++) {
					projectList[i].id --;
				};
			},
			duplicate   : function(){
				var temp = jQuery.extend(true, {}, this);
				temp.name = temp.name + ' Copy';
				temp.id = projectList.length;
				projectList.push(temp);
			}
		};
		projectList.push(output);
	}
	newProject('Default');


	function createHTML(){
		var out = [
				{ 
					'id': files().HTML.length,
					'name': 'index.html',
					'tree': [],
					select: 	function(){ location('file', this.id) },
					isSelected: function(){return String(this.id) === $routeParams.file},
					remove:     function(){
						var tempId = this.id;
						console.log('removed',files().HTML.splice(tempId, 1));
						for (var i = tempId; i < files().HTML.length; i++) {
							files().HTML[i].id --;
						};
					},
					duplicate:  function(){
						var temp = jQuery.extend(true, {}, this);
						var parts = temp.name.split('.');
						temp.name = parts[0] + 'Copy.' + parts[1];
						temp.id = files().HTML.length;
						files().HTML.push(temp);
					}
				}
			];
		return out;
	}

	function createCSS(){
		var out = [
				{ 
					'id': files().CSS.length,
					'name': 'app.css',
					'tree': [],
					select: 	function(){ location('file', this.id) },
					isSelected: function(){return String(this.id) === $routeParams.file},
					duplicate:  function(){
						var temp = jQuery.extend(true, {}, this);
						var parts = temp.name.split('.');
						temp.name = parts[0] + 'Copy.' + parts[1];
						temp.id = files().CSS.length;
						files().CSS.push(temp);
					}
				}
			];
		return out;
	}

	function currentProj(){
		return projectList[$routeParams.project];
	}

	function files(){
		var out = {'HTML':[], 'CSS': []};
		if (currentPg() && currentPg().name !== undefined && currentProj() && currentProj()[currentPg().name] !== undefined) {
			out.HTML = currentProj().HTML;
			out.CSS  = currentProj().CSS;
		}
		return out;
	}

	var project = {
		list: 		function(){ return projectList   		 },
		add:  		function(name){ newProject(name) 		 },
		get: 		function(id){ return projectList[id]     },
		remove:     function(id){ projectList.splice(id, 1)  },
		goTo:       function(id){ location('project',id)     },
		selected:   function(){ return currentProj()         },
		files:      function(){ return files()				 }
	}

//============RETURN API=============================

	return{
		page: 	  page,
		project:  project
	}

});
