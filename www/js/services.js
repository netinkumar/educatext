angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
.service('tagremove',function(){
  var tagremove={
    opdata: function(html){
       return html.replace(/<(?:.|\n)*?>/gm, '');
    }
  }
  return tagremove;
 })
.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

