// 'use strict';

/* Controllers */


function navCtrl($scope, $filter, dataService, navService) {
    $scope.project      = navService.project;
    $scope.selectedProj = navService.project.selected;
    $scope.page         = navService.page;
    $scope.selectedPage = navService.page.selected;

    $scope.selectPage = function(id, enabled){
        if (enabled) {
            $scope.page.goTo(id);
        };
    }
    $scope.selectProject = function(id){
        $scope.project.goTo(id);
    }

    $scope.popup = {
        "item":{},
        "show":false
    };

    $scope.show = {};
    $scope.show.projectDDL = false;
    $scope.show.fileDDL    = false;
}

function contentCtrl($scope, navService){
    $scope.selectedPage = navService.page.selected;
    $scope.partials = [
        { 'id': 0,'file' : 'html',    'controller' : 'htmlCtrl'   },
        { 'id': 1,'file' : 'css',     'controller' : 'cssCtrl'    },
        { 'id': 3,'file' : 'preview', 'controller' : 'previewCtrl'}
    ]
}

function htmlCtrl($scope){
    $scope.test = 'HTML';
}

function cssCtrl($scope){
    $scope.test = 'CSS';
}

function previewCtrl($scope){
    
}