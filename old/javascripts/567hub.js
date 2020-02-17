

angular.module("automap")  
.controller('hubCtrl', 
    ['$scope','$window','$goban',
     '$translate','$langs',
      '$firebase', hubCtrl]);


function hubCtrl($scope, $window, $goban, $translate, $langs, $firebase, $ethercalc){


/*
  angular.extend($scope, {
    tricks: [
      {t:'m', n:"MY_STAR"},
      {t:'s', n: "GOBAN_HUB"}
    ],
    hub: {}
  })

  $scope.trick = $scope.tricks[0].t; */


  angular.extend($scope, {
    getIndex: function(key){
      return Object.keys($scope.hub || {})
        .filter(function(s){
          return (s.substr(0,1) != '$' &&
                (key && s.indexOf(key) > -1)
              )
        })
        .sort(function(a,b){
          return a.indexOf(key) - b.indexOf(key);
        });
    },
    jumpTo: function(k){
      $goban.title = k;
      $goban.myI = 0;
      $goban.myJ = 0;
      $goban.load();
      $scope.curious = undefined;
      $scope.key = '';
    },
    createNew: function(k) {
      $scope.jumpTo(k);
    },
    keyPressed: function(e){
      if (e.which == 40) {
          $scope.curious = (typeof($scope.curious) != "undefined" && $scope.curious+1) || 0;
      }
      if (e.which == 38) {
        if (!$scope.curious) $scope.curious = undefined; 
        if ($scope.curious == 1) $scope.curious = 0;
        if ($scope.curious > 1) $scope.curious--;
      }
      if (e.which == 13) {
        var l = $scope.getIndex($scope.key);
        $scope.jumpTo(l[$scope.curious]);
      };
    }
  })

    // Firebase

    var u = 'https://goban-hub.firebaseio.com/';
    var ref = new Firebase(u);

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

  // download the data into a local object
    var syncObject = sync.$asObject();
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "hub");



    //partial events for event-driven programming

    $scope.$on('goban.loaded',function(event,args){

        if (args.p == 'data') {
            
            //hub
            if ($goban.data && $goban.data
              && $scope.hub) {

              var extObj = {};
              extObj[$goban.myI] = angular.copy($goban.data)
                .map(function(o){
                      var ans = {}
                      var ks = Object.keys(o);
                      for (var i = 0; i < ks.length; i++) {
                        if (typeof(o[ks[i]]) == 'undefined') {
                          ans[ks[i]] = false
                        } else {
                          ans[ks[i]] = decodeURI(o[ks[i]]);
                        }
                      };
                      return ans;
                });

              if ($scope.hub[$goban.title]) {
                if ($scope.hub[$goban.title].data) {
                  $scope.hub[$goban.title].data[$goban.myI] = extObj[$goban.myI];
                } else {
                  angular.extend( $scope.hub[$goban.title] , {
                    data: angular.copy(extObj)
                  });
                }
              } else {
                  $scope.hub[$goban.title] = {
                      data: angular.copy(extObj) 
                  }
              }
            } 
        } else if (args.p == 'config') {

          //hub
      
          if ($goban.related && $goban.related[0]
            && $scope.hub) {
            if ($scope.hub[$goban.title]) {
              $scope.hub[$goban.title].related = angular.copy($goban.related);
            } else {
              $scope.hub[$goban.title] = {
                related : angular.copy($goban.related)
              } 
            }
          }

        }

    })




  } 
  




