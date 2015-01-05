// Generated by LiveScript 1.3.1
(function(){
  var myEthercalc;
  myEthercalc = function($http){
    var obj;
    obj = {
      post: function(path, title, cell, text){
        var req;
        req = {
          method: 'POST',
          url: path + '_/' + title,
          'Content-Type': 'text/plain',
          dataType: 'application/json',
          contentType: 'text/plain',
          processData: false,
          data: 'set ' + cell + ' text t ' + text
        };
        $http(req).success(function(data, status, headers, config){}).error(function(data, status, headers, config){});
        /* 
        
            $.ajax({
                url: "https://ethercalc.org/_/test-12",
                type: 'POST',
                dataType: 'application/json',
                contentType: 'text/plain',
                processData: false,
                data: 'set ' + cell + ' text t ' + text
            });
        */
      }
    };
    return obj;
  };
  angular.module('ngEthercalc', []).factory('$ethercalc', ['$http', myEthercalc]);
}).call(this);
