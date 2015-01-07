var pth = location.pathname.split('/');

var userPath = pth[pth.length-1] != ''
      ? pth[pth.length-1].replace('.html','')
      : pth[pth.length-2].replace('.html',''); 

var defaultPath = 'goban_intro';

if (userPath == '404') {
  userPath = defaultPath;
}

console.log(userPath);


angular.module("automap",[
    'goban',
    'pascalprecht.translate',
    'ngStorage',
    'firebase',
    'ngEthercalc'])  
.controller('autoCtrl', 
    ['$scope','$window', 
    '$timeout', '$goban',
     '$translate','$langs'
      ,'$tips','$localStorage',
      '$firebase','$ethercalc', autoCtrl])
.filter('uriFix', myURI);

  function myURI() {
    return function(uri){
      return decodeURI(uri);
    }
  }

  function autoCtrl($scope, $window, $timeout, $goban, $translate, $langs, $tips, $localStorage, $firebase, $ethercalc){
   
    //Display Params
    angular.extend($scope, {
      myScale : 'small',
      scales : [['tiny','80%'],
                      ['small','100%'],
                        ['big','130%'],
                            ['gaint','150%']],
      navHeight : 50,
      countHeight : function(){
        return $window.innerHeight - 40;
      }
    });


    //Storage  <--
    $scope.$s = $localStorage.$default({
      myAnchors: []
    });

    angular.extend($scope, {
      isInAnchor: function(obj) {
        return ($localStorage.myAnchors.filter(function(o){
          return angular.equals(o, obj);
        })[0]) ? true : false;
      },

      showStar: function(obj){
        return $scope.isInAnchor(obj) ? 'images/star.png' : 'images/star_white.png';
      },

      isOutdatedAnchor: function(obj) {
        return ($localStorage.myAnchors.filter(function(o){
          return (o.x == obj.x) && (o.y == obj.y)
                    && (o.t == obj.t) && (o.n != obj.n);
        })[0]) ? true : false;
      },

      toggleAnchor: function(obj){
        if ($scope.isOutdatedAnchor(obj)) {
          $localStorage.myAnchors = $localStorage.myAnchors
            .map(function(o){
              return (o.x == obj.x && o.y == obj.y
                    && o.t == obj.t && o.n != obj.n) ? obj : o;
            })
        } else if ($scope.isInAnchor(obj)) {
          $localStorage.myAnchors = $localStorage.myAnchors
            .filter(function(o){
              return !angular.equals(o, obj)
            })
        } else {
          $localStorage.myAnchors.push(obj);
        }
      },

      resetAnchors: function(){
          if ($localStorage.myAnchors[0]) {
            $scope.myZan = angular.copy($localStorage.myAnchors);
            $localStorage.myAnchors = $localStorage.myAnchors.filter(function(o){
              return false;
            })
          } else {
            $localStorage.myAnchors = $scope.myZan;
          }
      }
    });

    //Goban <--
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : userPath || defaultPath,
      webConfig: true,
      colMax : 3
    });

    $scope.goban.init();


    //Tips  <- 123tips.js
    angular.extend($scope,
    {
      tips: $tips,
      t: 0
    });

    //Methods <--
    angular.extend($scope,
    {
      getURL: function(){
        if ($scope.editBack) {
          return $goban.trust($scope.editBack);
        }
        return $goban.getCurrentURL();
      },

      sleep: function(){
        $scope.editBack = ''; // not in Ethercalc
        console.log($scope.editBack);
      },

      initConfig: function(){
        $ethercalc.post({
                title: $goban.title,
                sur:'Config',
                cell: "A2",
                text: $goban.title});
      },

      maybeExtend: function(){
        if ($goban.myI == $goban.colMax) {
          $goban.colMax++;
          $goban.updateIndex();
        }
      },

      goEdit: function(c){
          var sur = (c || $goban.myI);
          $scope.editBack = $goban.path + $goban.title + sur;
      },

      myKeydown: function(e) {
        $goban.keyDown(e);
       // console.log(e.which);
        if (e.which == 90) {
          $scope.testing = !$scope.testing;
        }
      },

      relationChanged: function(){
        $goban.load();
      },

      blurFrame: function(){
        if ($scope.editBack == $goban.path + $goban.title + 'Config') {
          $goban.loadConfig();
        } else {
          $goban.load($goban.myI);
        }
        $scope.hideCtrl = 0;
      },

      objNow: function(){
        return {t: $goban.title,
                x: $goban.myI,
                y: $goban.myJ,
                n: (($goban.data && $goban.data[$goban.myJ]) || {}).name}
      }
    });


    // Langs  <-- translate/

    angular.extend($scope, {
      langs : $langs,
      changeLanguage: function (key) {
        $translate.use(key)
      }
    })


    console.log(navigator.language);
    if ($scope.langs.map(function(o){
      return o[0]
    }).indexOf(navigator.language) > -1){
      $scope.myLang = navigator.language
      $scope.changeLanguage($scope.myLang);
    }

    //nation flag

    $scope.getFlag = function(l){
      return $scope.langs.filter(function(d){
        return d[0] == l;
      })[0][2]
    }


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



    //Events for event-driven programming

    angular.extend($scope,{
      countD: 0,
      countC: 0,
    })

    $scope.$on('goban.dx', function(event,args){
      
      $scope.bufferI = parseInt($goban.myI);

      if ($scope.editBack) {
        $scope.goEdit();
      }
    })

    $scope.$on('goban.error',function(event,args){
        if (args.p == 'data' && $scope.countD < 5) {            
            $timeout($goban.load, 500);
            $scope.countD++;
        }
        else if (args.p == 'config') {
        	if ($scope.countC < 5) {
	            console.log("try reload config");
	            $timeout($goban.loadConfig, 500);
	            $scope.countC++;
	        } else {
              console.log($goban.title);
	          	$scope.initConfig();
	        }
        }
    });

    $scope.$on('goban.loaded',function(event,args){
        
        if ($scope.editBack == $goban.path + $goban.title + sur;
){
          $scope.goEdit('Config');
        }
        $scope.bufferI = parseInt($goban.myI);

        if (args.p == 'data') {
            $scope.countD = 0;
            console.log("data loaded");


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
                          ans[ks[i]] = o[ks[i]];
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
          $scope.countC = 0;
          console.log("config loaded");

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

          //autocomplete

          if (!$goban.related || !$goban.related.length) {
          	$scope.initConfig();
          }
        }

    })




  } 
  




