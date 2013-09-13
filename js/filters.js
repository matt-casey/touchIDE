'use strict';

/* Filters */

angular.module('myApp.filters', []).

    filter('awesomeFilter' ,function(){
        return function (text ){
            return text + '!!!!';
        }
    })
    .filter('filterByFunction', function(){
        return function(inp, fn){
            var out      = [];
            var rejected = [];
            if (inp === undefined) { return out };
            for (var i = 0; i < inp.length; i++) {
                inp[i][fn]() ? out.push(inp[i]) : rejected.push(inp[i]);
            };
            // console.log('rejected',rejected);
            return out;
        }
    })
    .filter('truncate', function(){
        return function(text, length){
            if (text === undefined){
                return '';
            }
            return text.length > 22 ? text.substring(0,length) + '...' : text;
        }
    });